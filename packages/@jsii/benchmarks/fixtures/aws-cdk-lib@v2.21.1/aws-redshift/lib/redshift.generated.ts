// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:15:09.761Z","fingerprint":"MIblA04bizi+v+B3/tO1EnLGAFMPPzU0w1CA2p4iotU="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnCluster`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html
 */
export interface CfnClusterProps {

    /**
     * The type of the cluster. When cluster type is specified as
     *
     * - `single-node` , the *NumberOfNodes* parameter is not required.
     * - `multi-node` , the *NumberOfNodes* parameter is required.
     *
     * Valid Values: `multi-node` | `single-node`
     *
     * Default: `multi-node`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-clustertype
     */
    readonly clusterType: string;

    /**
     * The name of the first database to be created when the cluster is created.
     *
     * To create additional databases after the cluster is created, connect to the cluster with a SQL client and use SQL commands to create a database. For more information, go to [Create a Database](https://docs.aws.amazon.com/redshift/latest/dg/t_creating_database.html) in the Amazon Redshift Database Developer Guide.
     *
     * Default: `dev`
     *
     * Constraints:
     *
     * - Must contain 1 to 64 alphanumeric characters.
     * - Must contain only lowercase letters.
     * - Cannot be a word that is reserved by the service. A list of reserved words can be found in [Reserved Words](https://docs.aws.amazon.com/redshift/latest/dg/r_pg_keywords.html) in the Amazon Redshift Database Developer Guide.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-dbname
     */
    readonly dbName: string;

    /**
     * The user name associated with the admin user account for the cluster that is being created.
     *
     * Constraints:
     *
     * - Must be 1 - 128 alphanumeric characters. The user name can't be `PUBLIC` .
     * - First character must be a letter.
     * - Cannot be a reserved word. A list of reserved words can be found in [Reserved Words](https://docs.aws.amazon.com/redshift/latest/dg/r_pg_keywords.html) in the Amazon Redshift Database Developer Guide.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-masterusername
     */
    readonly masterUsername: string;

    /**
     * The password associated with the admin user account for the cluster that is being created.
     *
     * Constraints:
     *
     * - Must be between 8 and 64 characters in length.
     * - Must contain at least one uppercase letter.
     * - Must contain at least one lowercase letter.
     * - Must contain one number.
     * - Can be any printable ASCII character (ASCII code 33-126) except ' (single quote), " (double quote), \, /, or @.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-masteruserpassword
     */
    readonly masterUserPassword: string;

    /**
     * The node type to be provisioned for the cluster. For information about node types, go to [Working with Clusters](https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html#how-many-nodes) in the *Amazon Redshift Cluster Management Guide* .
     *
     * Valid Values: `ds2.xlarge` | `ds2.8xlarge` | `dc1.large` | `dc1.8xlarge` | `dc2.large` | `dc2.8xlarge` | `ra3.xlplus` | `ra3.4xlarge` | `ra3.16xlarge`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-nodetype
     */
    readonly nodeType: string;

    /**
     * If `true` , major version upgrades can be applied during the maintenance window to the Amazon Redshift engine that is running on the cluster.
     *
     * When a new major version of the Amazon Redshift engine is released, you can request that the service automatically apply upgrades during the maintenance window to the Amazon Redshift engine that is running on your cluster.
     *
     * Default: `true`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-allowversionupgrade
     */
    readonly allowVersionUpgrade?: boolean | cdk.IResolvable;

    /**
     * The value represents how the cluster is configured to use AQUA (Advanced Query Accelerator) when it is created. Possible values include the following.
     *
     * - enabled - Use AQUA if it is available for the current AWS Region and Amazon Redshift node type.
     * - disabled - Don't use AQUA.
     * - auto - Amazon Redshift determines whether to use AQUA.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-aquaconfigurationstatus
     */
    readonly aquaConfigurationStatus?: string;

    /**
     * The number of days that automated snapshots are retained. If the value is 0, automated snapshots are disabled. Even if automated snapshots are disabled, you can still create manual snapshots when you want with [CreateClusterSnapshot](https://docs.aws.amazon.com/redshift/latest/APIReference/API_CreateClusterSnapshot.html) in the *Amazon Redshift API Reference* .
     *
     * Default: `1`
     *
     * Constraints: Must be a value from 0 to 35.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-automatedsnapshotretentionperiod
     */
    readonly automatedSnapshotRetentionPeriod?: number;

    /**
     * The EC2 Availability Zone (AZ) in which you want Amazon Redshift to provision the cluster. For example, if you have several EC2 instances running in a specific Availability Zone, then you might want the cluster to be provisioned in the same zone in order to decrease network latency.
     *
     * Default: A random, system-chosen Availability Zone in the region that is specified by the endpoint.
     *
     * Example: `us-east-2d`
     *
     * Constraint: The specified Availability Zone must be in the same region as the current endpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-availabilityzone
     */
    readonly availabilityZone?: string;

    /**
     * The option to enable relocation for an Amazon Redshift cluster between Availability Zones after the cluster is created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-availabilityzonerelocation
     */
    readonly availabilityZoneRelocation?: boolean | cdk.IResolvable;

    /**
     * Describes the status of the Availability Zone relocation operation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-availabilityzonerelocationstatus
     */
    readonly availabilityZoneRelocationStatus?: string;

    /**
     * A boolean value indicating whether the resize operation is using the classic resize process. If you don't provide this parameter or set the value to `false` , the resize type is elastic.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-classic
     */
    readonly classic?: boolean | cdk.IResolvable;

    /**
     * A unique identifier for the cluster. You use this identifier to refer to the cluster for any subsequent cluster operations such as deleting or modifying. The identifier also appears in the Amazon Redshift console.
     *
     * Constraints:
     *
     * - Must contain from 1 to 63 alphanumeric characters or hyphens.
     * - Alphabetic characters must be lowercase.
     * - First character must be a letter.
     * - Cannot end with a hyphen or contain two consecutive hyphens.
     * - Must be unique for all clusters within an AWS account .
     *
     * Example: `myexamplecluster`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-clusteridentifier
     */
    readonly clusterIdentifier?: string;

    /**
     * The name of the parameter group to be associated with this cluster.
     *
     * Default: The default Amazon Redshift cluster parameter group. For information about the default parameter group, go to [Working with Amazon Redshift Parameter Groups](https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-parameter-groups.html)
     *
     * Constraints:
     *
     * - Must be 1 to 255 alphanumeric characters or hyphens.
     * - First character must be a letter.
     * - Cannot end with a hyphen or contain two consecutive hyphens.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-clusterparametergroupname
     */
    readonly clusterParameterGroupName?: string;

    /**
     * A list of security groups to be associated with this cluster.
     *
     * Default: The default cluster security group for Amazon Redshift.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-clustersecuritygroups
     */
    readonly clusterSecurityGroups?: string[];

    /**
     * The name of a cluster subnet group to be associated with this cluster.
     *
     * If this parameter is not provided the resulting cluster will be deployed outside virtual private cloud (VPC).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-clustersubnetgroupname
     */
    readonly clusterSubnetGroupName?: string;

    /**
     * The version of the Amazon Redshift engine software that you want to deploy on the cluster.
     *
     * The version selected runs on all the nodes in the cluster.
     *
     * Constraints: Only version 1.0 is currently available.
     *
     * Example: `1.0`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-clusterversion
     */
    readonly clusterVersion?: string;

    /**
     * `AWS::Redshift::Cluster.DeferMaintenance`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-defermaintenance
     */
    readonly deferMaintenance?: boolean | cdk.IResolvable;

    /**
     * `AWS::Redshift::Cluster.DeferMaintenanceDuration`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-defermaintenanceduration
     */
    readonly deferMaintenanceDuration?: number;

    /**
     * `AWS::Redshift::Cluster.DeferMaintenanceEndTime`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-defermaintenanceendtime
     */
    readonly deferMaintenanceEndTime?: string;

    /**
     * `AWS::Redshift::Cluster.DeferMaintenanceStartTime`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-defermaintenancestarttime
     */
    readonly deferMaintenanceStartTime?: string;

    /**
     * The destination region that snapshots are automatically copied to when cross-region snapshot copy is enabled.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-destinationregion
     */
    readonly destinationRegion?: string;

    /**
     * The Elastic IP (EIP) address for the cluster.
     *
     * Constraints: The cluster must be provisioned in EC2-VPC and publicly-accessible through an Internet gateway. For more information about provisioning clusters in EC2-VPC, go to [Supported Platforms to Launch Your Cluster](https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html#cluster-platforms) in the Amazon Redshift Cluster Management Guide.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-elasticip
     */
    readonly elasticIp?: string;

    /**
     * If `true` , the data in the cluster is encrypted at rest.
     *
     * Default: false
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-encrypted
     */
    readonly encrypted?: boolean | cdk.IResolvable;

    /**
     * An option that specifies whether to create the cluster with enhanced VPC routing enabled. To create a cluster that uses enhanced VPC routing, the cluster must be in a VPC. For more information, see [Enhanced VPC Routing](https://docs.aws.amazon.com/redshift/latest/mgmt/enhanced-vpc-routing.html) in the Amazon Redshift Cluster Management Guide.
     *
     * If this option is `true` , enhanced VPC routing is enabled.
     *
     * Default: false
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-enhancedvpcrouting
     */
    readonly enhancedVpcRouting?: boolean | cdk.IResolvable;

    /**
     * Specifies the name of the HSM client certificate the Amazon Redshift cluster uses to retrieve the data encryption keys stored in an HSM.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-hsmclientcertificateidentifier
     */
    readonly hsmClientCertificateIdentifier?: string;

    /**
     * Specifies the name of the HSM configuration that contains the information the Amazon Redshift cluster can use to retrieve and store keys in an HSM.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-hsmconfigurationidentifier
     */
    readonly hsmConfigurationIdentifier?: string;

    /**
     * A list of AWS Identity and Access Management (IAM) roles that can be used by the cluster to access other AWS services. You must supply the IAM roles in their Amazon Resource Name (ARN) format.
     *
     * The maximum number of IAM roles that you can associate is subject to a quota. For more information, go to [Quotas and limits](https://docs.aws.amazon.com/redshift/latest/mgmt/amazon-redshift-limits.html) in the *Amazon Redshift Cluster Management Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-iamroles
     */
    readonly iamRoles?: string[];

    /**
     * The AWS Key Management Service (KMS) key ID of the encryption key that you want to use to encrypt data in the cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-kmskeyid
     */
    readonly kmsKeyId?: string;

    /**
     * Specifies logging information, such as queries and connection attempts, for the specified Amazon Redshift cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-loggingproperties
     */
    readonly loggingProperties?: CfnCluster.LoggingPropertiesProperty | cdk.IResolvable;

    /**
     * An optional parameter for the name of the maintenance track for the cluster. If you don't provide a maintenance track name, the cluster is assigned to the `current` track.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-maintenancetrackname
     */
    readonly maintenanceTrackName?: string;

    /**
     * The default number of days to retain a manual snapshot. If the value is -1, the snapshot is retained indefinitely. This setting doesn't change the retention period of existing snapshots.
     *
     * The value must be either -1 or an integer between 1 and 3,653.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-manualsnapshotretentionperiod
     */
    readonly manualSnapshotRetentionPeriod?: number;

    /**
     * The number of compute nodes in the cluster. This parameter is required when the *ClusterType* parameter is specified as `multi-node` .
     *
     * For information about determining how many nodes you need, go to [Working with Clusters](https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html#how-many-nodes) in the *Amazon Redshift Cluster Management Guide* .
     *
     * If you don't specify this parameter, you get a single-node cluster. When requesting a multi-node cluster, you must specify the number of nodes that you want in the cluster.
     *
     * Default: `1`
     *
     * Constraints: Value must be at least 1 and no more than 100.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-numberofnodes
     */
    readonly numberOfNodes?: number;

    /**
     * The AWS account used to create or copy the snapshot. Required if you are restoring a snapshot you do not own, optional if you own the snapshot.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-owneraccount
     */
    readonly ownerAccount?: string;

    /**
     * The port number on which the cluster accepts incoming connections.
     *
     * The cluster is accessible only via the JDBC and ODBC connection strings. Part of the connection string requires the port on which the cluster will listen for incoming connections.
     *
     * Default: `5439`
     *
     * Valid Values: `1150-65535`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-port
     */
    readonly port?: number;

    /**
     * The weekly time range (in UTC) during which automated cluster maintenance can occur.
     *
     * Format: `ddd:hh24:mi-ddd:hh24:mi`
     *
     * Default: A 30-minute window selected at random from an 8-hour block of time per region, occurring on a random day of the week. For more information about the time blocks for each region, see [Maintenance Windows](https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html#rs-maintenance-windows) in Amazon Redshift Cluster Management Guide.
     *
     * Valid Days: Mon | Tue | Wed | Thu | Fri | Sat | Sun
     *
     * Constraints: Minimum 30-minute window.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-preferredmaintenancewindow
     */
    readonly preferredMaintenanceWindow?: string;

    /**
     * If `true` , the cluster can be accessed from a public network.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-publiclyaccessible
     */
    readonly publiclyAccessible?: boolean | cdk.IResolvable;

    /**
     * `AWS::Redshift::Cluster.ResourceAction`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-resourceaction
     */
    readonly resourceAction?: string;

    /**
     * `AWS::Redshift::Cluster.RevisionTarget`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-revisiontarget
     */
    readonly revisionTarget?: string;

    /**
     * `AWS::Redshift::Cluster.RotateEncryptionKey`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-rotateencryptionkey
     */
    readonly rotateEncryptionKey?: boolean | cdk.IResolvable;

    /**
     * The name of the cluster the source snapshot was created from. This parameter is required if your IAM user has a policy containing a snapshot resource element that specifies anything other than * for the cluster name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-snapshotclusteridentifier
     */
    readonly snapshotClusterIdentifier?: string;

    /**
     * The name of the snapshot copy grant.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-snapshotcopygrantname
     */
    readonly snapshotCopyGrantName?: string;

    /**
     * Indicates whether to apply the snapshot retention period to newly copied manual snapshots instead of automated snapshots.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-snapshotcopymanual
     */
    readonly snapshotCopyManual?: boolean | cdk.IResolvable;

    /**
     * The number of days to retain automated snapshots in the destination AWS Region after they are copied from the source AWS Region .
     *
     * By default, this only changes the retention period of copied automated snapshots.
     *
     * If you decrease the retention period for automated snapshots that are copied to a destination AWS Region , Amazon Redshift deletes any existing automated snapshots that were copied to the destination AWS Region and that fall outside of the new retention period.
     *
     * Constraints: Must be at least 1 and no more than 35 for automated snapshots.
     *
     * If you specify the `manual` option, only newly copied manual snapshots will have the new retention period.
     *
     * If you specify the value of -1 newly copied manual snapshots are retained indefinitely.
     *
     * Constraints: The number of days must be either -1 or an integer between 1 and 3,653 for manual snapshots.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-snapshotcopyretentionperiod
     */
    readonly snapshotCopyRetentionPeriod?: number;

    /**
     * The name of the snapshot from which to create the new cluster. This parameter isn't case sensitive.
     *
     * Example: `my-snapshot-id`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-snapshotidentifier
     */
    readonly snapshotIdentifier?: string;

    /**
     * A list of tag instances.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * A list of Virtual Private Cloud (VPC) security groups to be associated with the cluster.
     *
     * Default: The default VPC security group is associated with the cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-vpcsecuritygroupids
     */
    readonly vpcSecurityGroupIds?: string[];
}

/**
 * Determine whether the given properties match those of a `CfnClusterProps`
 *
 * @param properties - the TypeScript properties of a `CfnClusterProps`
 *
 * @returns the result of the validation.
 */
function CfnClusterPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('allowVersionUpgrade', cdk.validateBoolean)(properties.allowVersionUpgrade));
    errors.collect(cdk.propertyValidator('aquaConfigurationStatus', cdk.validateString)(properties.aquaConfigurationStatus));
    errors.collect(cdk.propertyValidator('automatedSnapshotRetentionPeriod', cdk.validateNumber)(properties.automatedSnapshotRetentionPeriod));
    errors.collect(cdk.propertyValidator('availabilityZone', cdk.validateString)(properties.availabilityZone));
    errors.collect(cdk.propertyValidator('availabilityZoneRelocation', cdk.validateBoolean)(properties.availabilityZoneRelocation));
    errors.collect(cdk.propertyValidator('availabilityZoneRelocationStatus', cdk.validateString)(properties.availabilityZoneRelocationStatus));
    errors.collect(cdk.propertyValidator('classic', cdk.validateBoolean)(properties.classic));
    errors.collect(cdk.propertyValidator('clusterIdentifier', cdk.validateString)(properties.clusterIdentifier));
    errors.collect(cdk.propertyValidator('clusterParameterGroupName', cdk.validateString)(properties.clusterParameterGroupName));
    errors.collect(cdk.propertyValidator('clusterSecurityGroups', cdk.listValidator(cdk.validateString))(properties.clusterSecurityGroups));
    errors.collect(cdk.propertyValidator('clusterSubnetGroupName', cdk.validateString)(properties.clusterSubnetGroupName));
    errors.collect(cdk.propertyValidator('clusterType', cdk.requiredValidator)(properties.clusterType));
    errors.collect(cdk.propertyValidator('clusterType', cdk.validateString)(properties.clusterType));
    errors.collect(cdk.propertyValidator('clusterVersion', cdk.validateString)(properties.clusterVersion));
    errors.collect(cdk.propertyValidator('dbName', cdk.requiredValidator)(properties.dbName));
    errors.collect(cdk.propertyValidator('dbName', cdk.validateString)(properties.dbName));
    errors.collect(cdk.propertyValidator('deferMaintenance', cdk.validateBoolean)(properties.deferMaintenance));
    errors.collect(cdk.propertyValidator('deferMaintenanceDuration', cdk.validateNumber)(properties.deferMaintenanceDuration));
    errors.collect(cdk.propertyValidator('deferMaintenanceEndTime', cdk.validateString)(properties.deferMaintenanceEndTime));
    errors.collect(cdk.propertyValidator('deferMaintenanceStartTime', cdk.validateString)(properties.deferMaintenanceStartTime));
    errors.collect(cdk.propertyValidator('destinationRegion', cdk.validateString)(properties.destinationRegion));
    errors.collect(cdk.propertyValidator('elasticIp', cdk.validateString)(properties.elasticIp));
    errors.collect(cdk.propertyValidator('encrypted', cdk.validateBoolean)(properties.encrypted));
    errors.collect(cdk.propertyValidator('enhancedVpcRouting', cdk.validateBoolean)(properties.enhancedVpcRouting));
    errors.collect(cdk.propertyValidator('hsmClientCertificateIdentifier', cdk.validateString)(properties.hsmClientCertificateIdentifier));
    errors.collect(cdk.propertyValidator('hsmConfigurationIdentifier', cdk.validateString)(properties.hsmConfigurationIdentifier));
    errors.collect(cdk.propertyValidator('iamRoles', cdk.listValidator(cdk.validateString))(properties.iamRoles));
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    errors.collect(cdk.propertyValidator('loggingProperties', CfnCluster_LoggingPropertiesPropertyValidator)(properties.loggingProperties));
    errors.collect(cdk.propertyValidator('maintenanceTrackName', cdk.validateString)(properties.maintenanceTrackName));
    errors.collect(cdk.propertyValidator('manualSnapshotRetentionPeriod', cdk.validateNumber)(properties.manualSnapshotRetentionPeriod));
    errors.collect(cdk.propertyValidator('masterUserPassword', cdk.requiredValidator)(properties.masterUserPassword));
    errors.collect(cdk.propertyValidator('masterUserPassword', cdk.validateString)(properties.masterUserPassword));
    errors.collect(cdk.propertyValidator('masterUsername', cdk.requiredValidator)(properties.masterUsername));
    errors.collect(cdk.propertyValidator('masterUsername', cdk.validateString)(properties.masterUsername));
    errors.collect(cdk.propertyValidator('nodeType', cdk.requiredValidator)(properties.nodeType));
    errors.collect(cdk.propertyValidator('nodeType', cdk.validateString)(properties.nodeType));
    errors.collect(cdk.propertyValidator('numberOfNodes', cdk.validateNumber)(properties.numberOfNodes));
    errors.collect(cdk.propertyValidator('ownerAccount', cdk.validateString)(properties.ownerAccount));
    errors.collect(cdk.propertyValidator('port', cdk.validateNumber)(properties.port));
    errors.collect(cdk.propertyValidator('preferredMaintenanceWindow', cdk.validateString)(properties.preferredMaintenanceWindow));
    errors.collect(cdk.propertyValidator('publiclyAccessible', cdk.validateBoolean)(properties.publiclyAccessible));
    errors.collect(cdk.propertyValidator('resourceAction', cdk.validateString)(properties.resourceAction));
    errors.collect(cdk.propertyValidator('revisionTarget', cdk.validateString)(properties.revisionTarget));
    errors.collect(cdk.propertyValidator('rotateEncryptionKey', cdk.validateBoolean)(properties.rotateEncryptionKey));
    errors.collect(cdk.propertyValidator('snapshotClusterIdentifier', cdk.validateString)(properties.snapshotClusterIdentifier));
    errors.collect(cdk.propertyValidator('snapshotCopyGrantName', cdk.validateString)(properties.snapshotCopyGrantName));
    errors.collect(cdk.propertyValidator('snapshotCopyManual', cdk.validateBoolean)(properties.snapshotCopyManual));
    errors.collect(cdk.propertyValidator('snapshotCopyRetentionPeriod', cdk.validateNumber)(properties.snapshotCopyRetentionPeriod));
    errors.collect(cdk.propertyValidator('snapshotIdentifier', cdk.validateString)(properties.snapshotIdentifier));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('vpcSecurityGroupIds', cdk.listValidator(cdk.validateString))(properties.vpcSecurityGroupIds));
    return errors.wrap('supplied properties not correct for "CfnClusterProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Redshift::Cluster` resource
 *
 * @param properties - the TypeScript properties of a `CfnClusterProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Redshift::Cluster` resource.
 */
// @ts-ignore TS6133
function cfnClusterPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnClusterPropsValidator(properties).assertSuccess();
    return {
        ClusterType: cdk.stringToCloudFormation(properties.clusterType),
        DBName: cdk.stringToCloudFormation(properties.dbName),
        MasterUsername: cdk.stringToCloudFormation(properties.masterUsername),
        MasterUserPassword: cdk.stringToCloudFormation(properties.masterUserPassword),
        NodeType: cdk.stringToCloudFormation(properties.nodeType),
        AllowVersionUpgrade: cdk.booleanToCloudFormation(properties.allowVersionUpgrade),
        AquaConfigurationStatus: cdk.stringToCloudFormation(properties.aquaConfigurationStatus),
        AutomatedSnapshotRetentionPeriod: cdk.numberToCloudFormation(properties.automatedSnapshotRetentionPeriod),
        AvailabilityZone: cdk.stringToCloudFormation(properties.availabilityZone),
        AvailabilityZoneRelocation: cdk.booleanToCloudFormation(properties.availabilityZoneRelocation),
        AvailabilityZoneRelocationStatus: cdk.stringToCloudFormation(properties.availabilityZoneRelocationStatus),
        Classic: cdk.booleanToCloudFormation(properties.classic),
        ClusterIdentifier: cdk.stringToCloudFormation(properties.clusterIdentifier),
        ClusterParameterGroupName: cdk.stringToCloudFormation(properties.clusterParameterGroupName),
        ClusterSecurityGroups: cdk.listMapper(cdk.stringToCloudFormation)(properties.clusterSecurityGroups),
        ClusterSubnetGroupName: cdk.stringToCloudFormation(properties.clusterSubnetGroupName),
        ClusterVersion: cdk.stringToCloudFormation(properties.clusterVersion),
        DeferMaintenance: cdk.booleanToCloudFormation(properties.deferMaintenance),
        DeferMaintenanceDuration: cdk.numberToCloudFormation(properties.deferMaintenanceDuration),
        DeferMaintenanceEndTime: cdk.stringToCloudFormation(properties.deferMaintenanceEndTime),
        DeferMaintenanceStartTime: cdk.stringToCloudFormation(properties.deferMaintenanceStartTime),
        DestinationRegion: cdk.stringToCloudFormation(properties.destinationRegion),
        ElasticIp: cdk.stringToCloudFormation(properties.elasticIp),
        Encrypted: cdk.booleanToCloudFormation(properties.encrypted),
        EnhancedVpcRouting: cdk.booleanToCloudFormation(properties.enhancedVpcRouting),
        HsmClientCertificateIdentifier: cdk.stringToCloudFormation(properties.hsmClientCertificateIdentifier),
        HsmConfigurationIdentifier: cdk.stringToCloudFormation(properties.hsmConfigurationIdentifier),
        IamRoles: cdk.listMapper(cdk.stringToCloudFormation)(properties.iamRoles),
        KmsKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
        LoggingProperties: cfnClusterLoggingPropertiesPropertyToCloudFormation(properties.loggingProperties),
        MaintenanceTrackName: cdk.stringToCloudFormation(properties.maintenanceTrackName),
        ManualSnapshotRetentionPeriod: cdk.numberToCloudFormation(properties.manualSnapshotRetentionPeriod),
        NumberOfNodes: cdk.numberToCloudFormation(properties.numberOfNodes),
        OwnerAccount: cdk.stringToCloudFormation(properties.ownerAccount),
        Port: cdk.numberToCloudFormation(properties.port),
        PreferredMaintenanceWindow: cdk.stringToCloudFormation(properties.preferredMaintenanceWindow),
        PubliclyAccessible: cdk.booleanToCloudFormation(properties.publiclyAccessible),
        ResourceAction: cdk.stringToCloudFormation(properties.resourceAction),
        RevisionTarget: cdk.stringToCloudFormation(properties.revisionTarget),
        RotateEncryptionKey: cdk.booleanToCloudFormation(properties.rotateEncryptionKey),
        SnapshotClusterIdentifier: cdk.stringToCloudFormation(properties.snapshotClusterIdentifier),
        SnapshotCopyGrantName: cdk.stringToCloudFormation(properties.snapshotCopyGrantName),
        SnapshotCopyManual: cdk.booleanToCloudFormation(properties.snapshotCopyManual),
        SnapshotCopyRetentionPeriod: cdk.numberToCloudFormation(properties.snapshotCopyRetentionPeriod),
        SnapshotIdentifier: cdk.stringToCloudFormation(properties.snapshotIdentifier),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        VpcSecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.vpcSecurityGroupIds),
    };
}

// @ts-ignore TS6133
function CfnClusterPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnClusterProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnClusterProps>();
    ret.addPropertyResult('clusterType', 'ClusterType', cfn_parse.FromCloudFormation.getString(properties.ClusterType));
    ret.addPropertyResult('dbName', 'DBName', cfn_parse.FromCloudFormation.getString(properties.DBName));
    ret.addPropertyResult('masterUsername', 'MasterUsername', cfn_parse.FromCloudFormation.getString(properties.MasterUsername));
    ret.addPropertyResult('masterUserPassword', 'MasterUserPassword', cfn_parse.FromCloudFormation.getString(properties.MasterUserPassword));
    ret.addPropertyResult('nodeType', 'NodeType', cfn_parse.FromCloudFormation.getString(properties.NodeType));
    ret.addPropertyResult('allowVersionUpgrade', 'AllowVersionUpgrade', properties.AllowVersionUpgrade != null ? cfn_parse.FromCloudFormation.getBoolean(properties.AllowVersionUpgrade) : undefined);
    ret.addPropertyResult('aquaConfigurationStatus', 'AquaConfigurationStatus', properties.AquaConfigurationStatus != null ? cfn_parse.FromCloudFormation.getString(properties.AquaConfigurationStatus) : undefined);
    ret.addPropertyResult('automatedSnapshotRetentionPeriod', 'AutomatedSnapshotRetentionPeriod', properties.AutomatedSnapshotRetentionPeriod != null ? cfn_parse.FromCloudFormation.getNumber(properties.AutomatedSnapshotRetentionPeriod) : undefined);
    ret.addPropertyResult('availabilityZone', 'AvailabilityZone', properties.AvailabilityZone != null ? cfn_parse.FromCloudFormation.getString(properties.AvailabilityZone) : undefined);
    ret.addPropertyResult('availabilityZoneRelocation', 'AvailabilityZoneRelocation', properties.AvailabilityZoneRelocation != null ? cfn_parse.FromCloudFormation.getBoolean(properties.AvailabilityZoneRelocation) : undefined);
    ret.addPropertyResult('availabilityZoneRelocationStatus', 'AvailabilityZoneRelocationStatus', properties.AvailabilityZoneRelocationStatus != null ? cfn_parse.FromCloudFormation.getString(properties.AvailabilityZoneRelocationStatus) : undefined);
    ret.addPropertyResult('classic', 'Classic', properties.Classic != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Classic) : undefined);
    ret.addPropertyResult('clusterIdentifier', 'ClusterIdentifier', properties.ClusterIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.ClusterIdentifier) : undefined);
    ret.addPropertyResult('clusterParameterGroupName', 'ClusterParameterGroupName', properties.ClusterParameterGroupName != null ? cfn_parse.FromCloudFormation.getString(properties.ClusterParameterGroupName) : undefined);
    ret.addPropertyResult('clusterSecurityGroups', 'ClusterSecurityGroups', properties.ClusterSecurityGroups != null ? cfn_parse.FromCloudFormation.getStringArray(properties.ClusterSecurityGroups) : undefined);
    ret.addPropertyResult('clusterSubnetGroupName', 'ClusterSubnetGroupName', properties.ClusterSubnetGroupName != null ? cfn_parse.FromCloudFormation.getString(properties.ClusterSubnetGroupName) : undefined);
    ret.addPropertyResult('clusterVersion', 'ClusterVersion', properties.ClusterVersion != null ? cfn_parse.FromCloudFormation.getString(properties.ClusterVersion) : undefined);
    ret.addPropertyResult('deferMaintenance', 'DeferMaintenance', properties.DeferMaintenance != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DeferMaintenance) : undefined);
    ret.addPropertyResult('deferMaintenanceDuration', 'DeferMaintenanceDuration', properties.DeferMaintenanceDuration != null ? cfn_parse.FromCloudFormation.getNumber(properties.DeferMaintenanceDuration) : undefined);
    ret.addPropertyResult('deferMaintenanceEndTime', 'DeferMaintenanceEndTime', properties.DeferMaintenanceEndTime != null ? cfn_parse.FromCloudFormation.getString(properties.DeferMaintenanceEndTime) : undefined);
    ret.addPropertyResult('deferMaintenanceStartTime', 'DeferMaintenanceStartTime', properties.DeferMaintenanceStartTime != null ? cfn_parse.FromCloudFormation.getString(properties.DeferMaintenanceStartTime) : undefined);
    ret.addPropertyResult('destinationRegion', 'DestinationRegion', properties.DestinationRegion != null ? cfn_parse.FromCloudFormation.getString(properties.DestinationRegion) : undefined);
    ret.addPropertyResult('elasticIp', 'ElasticIp', properties.ElasticIp != null ? cfn_parse.FromCloudFormation.getString(properties.ElasticIp) : undefined);
    ret.addPropertyResult('encrypted', 'Encrypted', properties.Encrypted != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Encrypted) : undefined);
    ret.addPropertyResult('enhancedVpcRouting', 'EnhancedVpcRouting', properties.EnhancedVpcRouting != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnhancedVpcRouting) : undefined);
    ret.addPropertyResult('hsmClientCertificateIdentifier', 'HsmClientCertificateIdentifier', properties.HsmClientCertificateIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.HsmClientCertificateIdentifier) : undefined);
    ret.addPropertyResult('hsmConfigurationIdentifier', 'HsmConfigurationIdentifier', properties.HsmConfigurationIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.HsmConfigurationIdentifier) : undefined);
    ret.addPropertyResult('iamRoles', 'IamRoles', properties.IamRoles != null ? cfn_parse.FromCloudFormation.getStringArray(properties.IamRoles) : undefined);
    ret.addPropertyResult('kmsKeyId', 'KmsKeyId', properties.KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyId) : undefined);
    ret.addPropertyResult('loggingProperties', 'LoggingProperties', properties.LoggingProperties != null ? CfnClusterLoggingPropertiesPropertyFromCloudFormation(properties.LoggingProperties) : undefined);
    ret.addPropertyResult('maintenanceTrackName', 'MaintenanceTrackName', properties.MaintenanceTrackName != null ? cfn_parse.FromCloudFormation.getString(properties.MaintenanceTrackName) : undefined);
    ret.addPropertyResult('manualSnapshotRetentionPeriod', 'ManualSnapshotRetentionPeriod', properties.ManualSnapshotRetentionPeriod != null ? cfn_parse.FromCloudFormation.getNumber(properties.ManualSnapshotRetentionPeriod) : undefined);
    ret.addPropertyResult('numberOfNodes', 'NumberOfNodes', properties.NumberOfNodes != null ? cfn_parse.FromCloudFormation.getNumber(properties.NumberOfNodes) : undefined);
    ret.addPropertyResult('ownerAccount', 'OwnerAccount', properties.OwnerAccount != null ? cfn_parse.FromCloudFormation.getString(properties.OwnerAccount) : undefined);
    ret.addPropertyResult('port', 'Port', properties.Port != null ? cfn_parse.FromCloudFormation.getNumber(properties.Port) : undefined);
    ret.addPropertyResult('preferredMaintenanceWindow', 'PreferredMaintenanceWindow', properties.PreferredMaintenanceWindow != null ? cfn_parse.FromCloudFormation.getString(properties.PreferredMaintenanceWindow) : undefined);
    ret.addPropertyResult('publiclyAccessible', 'PubliclyAccessible', properties.PubliclyAccessible != null ? cfn_parse.FromCloudFormation.getBoolean(properties.PubliclyAccessible) : undefined);
    ret.addPropertyResult('resourceAction', 'ResourceAction', properties.ResourceAction != null ? cfn_parse.FromCloudFormation.getString(properties.ResourceAction) : undefined);
    ret.addPropertyResult('revisionTarget', 'RevisionTarget', properties.RevisionTarget != null ? cfn_parse.FromCloudFormation.getString(properties.RevisionTarget) : undefined);
    ret.addPropertyResult('rotateEncryptionKey', 'RotateEncryptionKey', properties.RotateEncryptionKey != null ? cfn_parse.FromCloudFormation.getBoolean(properties.RotateEncryptionKey) : undefined);
    ret.addPropertyResult('snapshotClusterIdentifier', 'SnapshotClusterIdentifier', properties.SnapshotClusterIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.SnapshotClusterIdentifier) : undefined);
    ret.addPropertyResult('snapshotCopyGrantName', 'SnapshotCopyGrantName', properties.SnapshotCopyGrantName != null ? cfn_parse.FromCloudFormation.getString(properties.SnapshotCopyGrantName) : undefined);
    ret.addPropertyResult('snapshotCopyManual', 'SnapshotCopyManual', properties.SnapshotCopyManual != null ? cfn_parse.FromCloudFormation.getBoolean(properties.SnapshotCopyManual) : undefined);
    ret.addPropertyResult('snapshotCopyRetentionPeriod', 'SnapshotCopyRetentionPeriod', properties.SnapshotCopyRetentionPeriod != null ? cfn_parse.FromCloudFormation.getNumber(properties.SnapshotCopyRetentionPeriod) : undefined);
    ret.addPropertyResult('snapshotIdentifier', 'SnapshotIdentifier', properties.SnapshotIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.SnapshotIdentifier) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('vpcSecurityGroupIds', 'VpcSecurityGroupIds', properties.VpcSecurityGroupIds != null ? cfn_parse.FromCloudFormation.getStringArray(properties.VpcSecurityGroupIds) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Redshift::Cluster`
 *
 * Specifies a cluster. A *cluster* is a fully managed data warehouse that consists of a set of compute nodes.
 *
 * To create a cluster in Virtual Private Cloud (VPC), you must provide a cluster subnet group name. The cluster subnet group identifies the subnets of your VPC that Amazon Redshift uses when creating the cluster. For more information about managing clusters, go to [Amazon Redshift Clusters](https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html) in the *Amazon Redshift Cluster Management Guide* .
 *
 * @cloudformationResource AWS::Redshift::Cluster
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html
 */
export class CfnCluster extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Redshift::Cluster";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnCluster {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnClusterPropsFromCloudFormation(resourceProperties);
        const ret = new CfnCluster(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     *
     * @cloudformationAttribute DeferMaintenanceIdentifier
     */
    public readonly attrDeferMaintenanceIdentifier: string;

    /**
     * The connection endpoint for the Amazon Redshift cluster. For example: `examplecluster.cg034hpkmmjt.us-east-1.redshift.amazonaws.com` .
     * @cloudformationAttribute Endpoint.Address
     */
    public readonly attrEndpointAddress: string;

    /**
     * The port number on which the Amazon Redshift cluster accepts connections. For example: `5439` .
     * @cloudformationAttribute Endpoint.Port
     */
    public readonly attrEndpointPort: string;

    /**
     * A unique identifier for the cluster. You use this identifier to refer to the cluster for any subsequent cluster operations such as deleting or modifying. The identifier also appears in the Amazon Redshift console.
     *
     * Example: `myexamplecluster`
     * @cloudformationAttribute Id
     */
    public readonly attrId: string;

    /**
     * The type of the cluster. When cluster type is specified as
     *
     * - `single-node` , the *NumberOfNodes* parameter is not required.
     * - `multi-node` , the *NumberOfNodes* parameter is required.
     *
     * Valid Values: `multi-node` | `single-node`
     *
     * Default: `multi-node`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-clustertype
     */
    public clusterType: string;

    /**
     * The name of the first database to be created when the cluster is created.
     *
     * To create additional databases after the cluster is created, connect to the cluster with a SQL client and use SQL commands to create a database. For more information, go to [Create a Database](https://docs.aws.amazon.com/redshift/latest/dg/t_creating_database.html) in the Amazon Redshift Database Developer Guide.
     *
     * Default: `dev`
     *
     * Constraints:
     *
     * - Must contain 1 to 64 alphanumeric characters.
     * - Must contain only lowercase letters.
     * - Cannot be a word that is reserved by the service. A list of reserved words can be found in [Reserved Words](https://docs.aws.amazon.com/redshift/latest/dg/r_pg_keywords.html) in the Amazon Redshift Database Developer Guide.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-dbname
     */
    public dbName: string;

    /**
     * The user name associated with the admin user account for the cluster that is being created.
     *
     * Constraints:
     *
     * - Must be 1 - 128 alphanumeric characters. The user name can't be `PUBLIC` .
     * - First character must be a letter.
     * - Cannot be a reserved word. A list of reserved words can be found in [Reserved Words](https://docs.aws.amazon.com/redshift/latest/dg/r_pg_keywords.html) in the Amazon Redshift Database Developer Guide.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-masterusername
     */
    public masterUsername: string;

    /**
     * The password associated with the admin user account for the cluster that is being created.
     *
     * Constraints:
     *
     * - Must be between 8 and 64 characters in length.
     * - Must contain at least one uppercase letter.
     * - Must contain at least one lowercase letter.
     * - Must contain one number.
     * - Can be any printable ASCII character (ASCII code 33-126) except ' (single quote), " (double quote), \, /, or @.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-masteruserpassword
     */
    public masterUserPassword: string;

    /**
     * The node type to be provisioned for the cluster. For information about node types, go to [Working with Clusters](https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html#how-many-nodes) in the *Amazon Redshift Cluster Management Guide* .
     *
     * Valid Values: `ds2.xlarge` | `ds2.8xlarge` | `dc1.large` | `dc1.8xlarge` | `dc2.large` | `dc2.8xlarge` | `ra3.xlplus` | `ra3.4xlarge` | `ra3.16xlarge`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-nodetype
     */
    public nodeType: string;

    /**
     * If `true` , major version upgrades can be applied during the maintenance window to the Amazon Redshift engine that is running on the cluster.
     *
     * When a new major version of the Amazon Redshift engine is released, you can request that the service automatically apply upgrades during the maintenance window to the Amazon Redshift engine that is running on your cluster.
     *
     * Default: `true`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-allowversionupgrade
     */
    public allowVersionUpgrade: boolean | cdk.IResolvable | undefined;

    /**
     * The value represents how the cluster is configured to use AQUA (Advanced Query Accelerator) when it is created. Possible values include the following.
     *
     * - enabled - Use AQUA if it is available for the current AWS Region and Amazon Redshift node type.
     * - disabled - Don't use AQUA.
     * - auto - Amazon Redshift determines whether to use AQUA.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-aquaconfigurationstatus
     */
    public aquaConfigurationStatus: string | undefined;

    /**
     * The number of days that automated snapshots are retained. If the value is 0, automated snapshots are disabled. Even if automated snapshots are disabled, you can still create manual snapshots when you want with [CreateClusterSnapshot](https://docs.aws.amazon.com/redshift/latest/APIReference/API_CreateClusterSnapshot.html) in the *Amazon Redshift API Reference* .
     *
     * Default: `1`
     *
     * Constraints: Must be a value from 0 to 35.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-automatedsnapshotretentionperiod
     */
    public automatedSnapshotRetentionPeriod: number | undefined;

    /**
     * The EC2 Availability Zone (AZ) in which you want Amazon Redshift to provision the cluster. For example, if you have several EC2 instances running in a specific Availability Zone, then you might want the cluster to be provisioned in the same zone in order to decrease network latency.
     *
     * Default: A random, system-chosen Availability Zone in the region that is specified by the endpoint.
     *
     * Example: `us-east-2d`
     *
     * Constraint: The specified Availability Zone must be in the same region as the current endpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-availabilityzone
     */
    public availabilityZone: string | undefined;

    /**
     * The option to enable relocation for an Amazon Redshift cluster between Availability Zones after the cluster is created.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-availabilityzonerelocation
     */
    public availabilityZoneRelocation: boolean | cdk.IResolvable | undefined;

    /**
     * Describes the status of the Availability Zone relocation operation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-availabilityzonerelocationstatus
     */
    public availabilityZoneRelocationStatus: string | undefined;

    /**
     * A boolean value indicating whether the resize operation is using the classic resize process. If you don't provide this parameter or set the value to `false` , the resize type is elastic.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-classic
     */
    public classic: boolean | cdk.IResolvable | undefined;

    /**
     * A unique identifier for the cluster. You use this identifier to refer to the cluster for any subsequent cluster operations such as deleting or modifying. The identifier also appears in the Amazon Redshift console.
     *
     * Constraints:
     *
     * - Must contain from 1 to 63 alphanumeric characters or hyphens.
     * - Alphabetic characters must be lowercase.
     * - First character must be a letter.
     * - Cannot end with a hyphen or contain two consecutive hyphens.
     * - Must be unique for all clusters within an AWS account .
     *
     * Example: `myexamplecluster`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-clusteridentifier
     */
    public clusterIdentifier: string | undefined;

    /**
     * The name of the parameter group to be associated with this cluster.
     *
     * Default: The default Amazon Redshift cluster parameter group. For information about the default parameter group, go to [Working with Amazon Redshift Parameter Groups](https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-parameter-groups.html)
     *
     * Constraints:
     *
     * - Must be 1 to 255 alphanumeric characters or hyphens.
     * - First character must be a letter.
     * - Cannot end with a hyphen or contain two consecutive hyphens.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-clusterparametergroupname
     */
    public clusterParameterGroupName: string | undefined;

    /**
     * A list of security groups to be associated with this cluster.
     *
     * Default: The default cluster security group for Amazon Redshift.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-clustersecuritygroups
     */
    public clusterSecurityGroups: string[] | undefined;

    /**
     * The name of a cluster subnet group to be associated with this cluster.
     *
     * If this parameter is not provided the resulting cluster will be deployed outside virtual private cloud (VPC).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-clustersubnetgroupname
     */
    public clusterSubnetGroupName: string | undefined;

    /**
     * The version of the Amazon Redshift engine software that you want to deploy on the cluster.
     *
     * The version selected runs on all the nodes in the cluster.
     *
     * Constraints: Only version 1.0 is currently available.
     *
     * Example: `1.0`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-clusterversion
     */
    public clusterVersion: string | undefined;

    /**
     * `AWS::Redshift::Cluster.DeferMaintenance`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-defermaintenance
     */
    public deferMaintenance: boolean | cdk.IResolvable | undefined;

    /**
     * `AWS::Redshift::Cluster.DeferMaintenanceDuration`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-defermaintenanceduration
     */
    public deferMaintenanceDuration: number | undefined;

    /**
     * `AWS::Redshift::Cluster.DeferMaintenanceEndTime`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-defermaintenanceendtime
     */
    public deferMaintenanceEndTime: string | undefined;

    /**
     * `AWS::Redshift::Cluster.DeferMaintenanceStartTime`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-defermaintenancestarttime
     */
    public deferMaintenanceStartTime: string | undefined;

    /**
     * The destination region that snapshots are automatically copied to when cross-region snapshot copy is enabled.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-destinationregion
     */
    public destinationRegion: string | undefined;

    /**
     * The Elastic IP (EIP) address for the cluster.
     *
     * Constraints: The cluster must be provisioned in EC2-VPC and publicly-accessible through an Internet gateway. For more information about provisioning clusters in EC2-VPC, go to [Supported Platforms to Launch Your Cluster](https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html#cluster-platforms) in the Amazon Redshift Cluster Management Guide.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-elasticip
     */
    public elasticIp: string | undefined;

    /**
     * If `true` , the data in the cluster is encrypted at rest.
     *
     * Default: false
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-encrypted
     */
    public encrypted: boolean | cdk.IResolvable | undefined;

    /**
     * An option that specifies whether to create the cluster with enhanced VPC routing enabled. To create a cluster that uses enhanced VPC routing, the cluster must be in a VPC. For more information, see [Enhanced VPC Routing](https://docs.aws.amazon.com/redshift/latest/mgmt/enhanced-vpc-routing.html) in the Amazon Redshift Cluster Management Guide.
     *
     * If this option is `true` , enhanced VPC routing is enabled.
     *
     * Default: false
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-enhancedvpcrouting
     */
    public enhancedVpcRouting: boolean | cdk.IResolvable | undefined;

    /**
     * Specifies the name of the HSM client certificate the Amazon Redshift cluster uses to retrieve the data encryption keys stored in an HSM.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-hsmclientcertificateidentifier
     */
    public hsmClientCertificateIdentifier: string | undefined;

    /**
     * Specifies the name of the HSM configuration that contains the information the Amazon Redshift cluster can use to retrieve and store keys in an HSM.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-hsmconfigurationidentifier
     */
    public hsmConfigurationIdentifier: string | undefined;

    /**
     * A list of AWS Identity and Access Management (IAM) roles that can be used by the cluster to access other AWS services. You must supply the IAM roles in their Amazon Resource Name (ARN) format.
     *
     * The maximum number of IAM roles that you can associate is subject to a quota. For more information, go to [Quotas and limits](https://docs.aws.amazon.com/redshift/latest/mgmt/amazon-redshift-limits.html) in the *Amazon Redshift Cluster Management Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-iamroles
     */
    public iamRoles: string[] | undefined;

    /**
     * The AWS Key Management Service (KMS) key ID of the encryption key that you want to use to encrypt data in the cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-kmskeyid
     */
    public kmsKeyId: string | undefined;

    /**
     * Specifies logging information, such as queries and connection attempts, for the specified Amazon Redshift cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-loggingproperties
     */
    public loggingProperties: CfnCluster.LoggingPropertiesProperty | cdk.IResolvable | undefined;

    /**
     * An optional parameter for the name of the maintenance track for the cluster. If you don't provide a maintenance track name, the cluster is assigned to the `current` track.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-maintenancetrackname
     */
    public maintenanceTrackName: string | undefined;

    /**
     * The default number of days to retain a manual snapshot. If the value is -1, the snapshot is retained indefinitely. This setting doesn't change the retention period of existing snapshots.
     *
     * The value must be either -1 or an integer between 1 and 3,653.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-manualsnapshotretentionperiod
     */
    public manualSnapshotRetentionPeriod: number | undefined;

    /**
     * The number of compute nodes in the cluster. This parameter is required when the *ClusterType* parameter is specified as `multi-node` .
     *
     * For information about determining how many nodes you need, go to [Working with Clusters](https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html#how-many-nodes) in the *Amazon Redshift Cluster Management Guide* .
     *
     * If you don't specify this parameter, you get a single-node cluster. When requesting a multi-node cluster, you must specify the number of nodes that you want in the cluster.
     *
     * Default: `1`
     *
     * Constraints: Value must be at least 1 and no more than 100.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-numberofnodes
     */
    public numberOfNodes: number | undefined;

    /**
     * The AWS account used to create or copy the snapshot. Required if you are restoring a snapshot you do not own, optional if you own the snapshot.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-owneraccount
     */
    public ownerAccount: string | undefined;

    /**
     * The port number on which the cluster accepts incoming connections.
     *
     * The cluster is accessible only via the JDBC and ODBC connection strings. Part of the connection string requires the port on which the cluster will listen for incoming connections.
     *
     * Default: `5439`
     *
     * Valid Values: `1150-65535`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-port
     */
    public port: number | undefined;

    /**
     * The weekly time range (in UTC) during which automated cluster maintenance can occur.
     *
     * Format: `ddd:hh24:mi-ddd:hh24:mi`
     *
     * Default: A 30-minute window selected at random from an 8-hour block of time per region, occurring on a random day of the week. For more information about the time blocks for each region, see [Maintenance Windows](https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-clusters.html#rs-maintenance-windows) in Amazon Redshift Cluster Management Guide.
     *
     * Valid Days: Mon | Tue | Wed | Thu | Fri | Sat | Sun
     *
     * Constraints: Minimum 30-minute window.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-preferredmaintenancewindow
     */
    public preferredMaintenanceWindow: string | undefined;

    /**
     * If `true` , the cluster can be accessed from a public network.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-publiclyaccessible
     */
    public publiclyAccessible: boolean | cdk.IResolvable | undefined;

    /**
     * `AWS::Redshift::Cluster.ResourceAction`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-resourceaction
     */
    public resourceAction: string | undefined;

    /**
     * `AWS::Redshift::Cluster.RevisionTarget`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-revisiontarget
     */
    public revisionTarget: string | undefined;

    /**
     * `AWS::Redshift::Cluster.RotateEncryptionKey`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-rotateencryptionkey
     */
    public rotateEncryptionKey: boolean | cdk.IResolvable | undefined;

    /**
     * The name of the cluster the source snapshot was created from. This parameter is required if your IAM user has a policy containing a snapshot resource element that specifies anything other than * for the cluster name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-snapshotclusteridentifier
     */
    public snapshotClusterIdentifier: string | undefined;

    /**
     * The name of the snapshot copy grant.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-snapshotcopygrantname
     */
    public snapshotCopyGrantName: string | undefined;

    /**
     * Indicates whether to apply the snapshot retention period to newly copied manual snapshots instead of automated snapshots.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-snapshotcopymanual
     */
    public snapshotCopyManual: boolean | cdk.IResolvable | undefined;

    /**
     * The number of days to retain automated snapshots in the destination AWS Region after they are copied from the source AWS Region .
     *
     * By default, this only changes the retention period of copied automated snapshots.
     *
     * If you decrease the retention period for automated snapshots that are copied to a destination AWS Region , Amazon Redshift deletes any existing automated snapshots that were copied to the destination AWS Region and that fall outside of the new retention period.
     *
     * Constraints: Must be at least 1 and no more than 35 for automated snapshots.
     *
     * If you specify the `manual` option, only newly copied manual snapshots will have the new retention period.
     *
     * If you specify the value of -1 newly copied manual snapshots are retained indefinitely.
     *
     * Constraints: The number of days must be either -1 or an integer between 1 and 3,653 for manual snapshots.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-snapshotcopyretentionperiod
     */
    public snapshotCopyRetentionPeriod: number | undefined;

    /**
     * The name of the snapshot from which to create the new cluster. This parameter isn't case sensitive.
     *
     * Example: `my-snapshot-id`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-snapshotidentifier
     */
    public snapshotIdentifier: string | undefined;

    /**
     * A list of tag instances.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * A list of Virtual Private Cloud (VPC) security groups to be associated with the cluster.
     *
     * Default: The default VPC security group is associated with the cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-cluster.html#cfn-redshift-cluster-vpcsecuritygroupids
     */
    public vpcSecurityGroupIds: string[] | undefined;

    /**
     * Create a new `AWS::Redshift::Cluster`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnClusterProps) {
        super(scope, id, { type: CfnCluster.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'clusterType', this);
        cdk.requireProperty(props, 'dbName', this);
        cdk.requireProperty(props, 'masterUserPassword', this);
        cdk.requireProperty(props, 'masterUsername', this);
        cdk.requireProperty(props, 'nodeType', this);
        this.attrDeferMaintenanceIdentifier = cdk.Token.asString(this.getAtt('DeferMaintenanceIdentifier'));
        this.attrEndpointAddress = cdk.Token.asString(this.getAtt('Endpoint.Address'));
        this.attrEndpointPort = cdk.Token.asString(this.getAtt('Endpoint.Port'));
        this.attrId = cdk.Token.asString(this.getAtt('Id'));

        this.clusterType = props.clusterType;
        this.dbName = props.dbName;
        this.masterUsername = props.masterUsername;
        this.masterUserPassword = props.masterUserPassword;
        this.nodeType = props.nodeType;
        this.allowVersionUpgrade = props.allowVersionUpgrade;
        this.aquaConfigurationStatus = props.aquaConfigurationStatus;
        this.automatedSnapshotRetentionPeriod = props.automatedSnapshotRetentionPeriod;
        this.availabilityZone = props.availabilityZone;
        this.availabilityZoneRelocation = props.availabilityZoneRelocation;
        this.availabilityZoneRelocationStatus = props.availabilityZoneRelocationStatus;
        this.classic = props.classic;
        this.clusterIdentifier = props.clusterIdentifier;
        this.clusterParameterGroupName = props.clusterParameterGroupName;
        this.clusterSecurityGroups = props.clusterSecurityGroups;
        this.clusterSubnetGroupName = props.clusterSubnetGroupName;
        this.clusterVersion = props.clusterVersion;
        this.deferMaintenance = props.deferMaintenance;
        this.deferMaintenanceDuration = props.deferMaintenanceDuration;
        this.deferMaintenanceEndTime = props.deferMaintenanceEndTime;
        this.deferMaintenanceStartTime = props.deferMaintenanceStartTime;
        this.destinationRegion = props.destinationRegion;
        this.elasticIp = props.elasticIp;
        this.encrypted = props.encrypted;
        this.enhancedVpcRouting = props.enhancedVpcRouting;
        this.hsmClientCertificateIdentifier = props.hsmClientCertificateIdentifier;
        this.hsmConfigurationIdentifier = props.hsmConfigurationIdentifier;
        this.iamRoles = props.iamRoles;
        this.kmsKeyId = props.kmsKeyId;
        this.loggingProperties = props.loggingProperties;
        this.maintenanceTrackName = props.maintenanceTrackName;
        this.manualSnapshotRetentionPeriod = props.manualSnapshotRetentionPeriod;
        this.numberOfNodes = props.numberOfNodes;
        this.ownerAccount = props.ownerAccount;
        this.port = props.port;
        this.preferredMaintenanceWindow = props.preferredMaintenanceWindow;
        this.publiclyAccessible = props.publiclyAccessible;
        this.resourceAction = props.resourceAction;
        this.revisionTarget = props.revisionTarget;
        this.rotateEncryptionKey = props.rotateEncryptionKey;
        this.snapshotClusterIdentifier = props.snapshotClusterIdentifier;
        this.snapshotCopyGrantName = props.snapshotCopyGrantName;
        this.snapshotCopyManual = props.snapshotCopyManual;
        this.snapshotCopyRetentionPeriod = props.snapshotCopyRetentionPeriod;
        this.snapshotIdentifier = props.snapshotIdentifier;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Redshift::Cluster", props.tags, { tagPropertyName: 'tags' });
        this.vpcSecurityGroupIds = props.vpcSecurityGroupIds;
        if (this.node.scope && cdk.Resource.isResource(this.node.scope)) {
            this.node.addValidation({ validate: () => this.cfnOptions.deletionPolicy === undefined
              ? ['\'AWS::Redshift::Cluster\' is a stateful resource type, and you must specify a Removal Policy for it. Call \'resource.applyRemovalPolicy()\'.']
              : [] });
        }
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnCluster.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            clusterType: this.clusterType,
            dbName: this.dbName,
            masterUsername: this.masterUsername,
            masterUserPassword: this.masterUserPassword,
            nodeType: this.nodeType,
            allowVersionUpgrade: this.allowVersionUpgrade,
            aquaConfigurationStatus: this.aquaConfigurationStatus,
            automatedSnapshotRetentionPeriod: this.automatedSnapshotRetentionPeriod,
            availabilityZone: this.availabilityZone,
            availabilityZoneRelocation: this.availabilityZoneRelocation,
            availabilityZoneRelocationStatus: this.availabilityZoneRelocationStatus,
            classic: this.classic,
            clusterIdentifier: this.clusterIdentifier,
            clusterParameterGroupName: this.clusterParameterGroupName,
            clusterSecurityGroups: this.clusterSecurityGroups,
            clusterSubnetGroupName: this.clusterSubnetGroupName,
            clusterVersion: this.clusterVersion,
            deferMaintenance: this.deferMaintenance,
            deferMaintenanceDuration: this.deferMaintenanceDuration,
            deferMaintenanceEndTime: this.deferMaintenanceEndTime,
            deferMaintenanceStartTime: this.deferMaintenanceStartTime,
            destinationRegion: this.destinationRegion,
            elasticIp: this.elasticIp,
            encrypted: this.encrypted,
            enhancedVpcRouting: this.enhancedVpcRouting,
            hsmClientCertificateIdentifier: this.hsmClientCertificateIdentifier,
            hsmConfigurationIdentifier: this.hsmConfigurationIdentifier,
            iamRoles: this.iamRoles,
            kmsKeyId: this.kmsKeyId,
            loggingProperties: this.loggingProperties,
            maintenanceTrackName: this.maintenanceTrackName,
            manualSnapshotRetentionPeriod: this.manualSnapshotRetentionPeriod,
            numberOfNodes: this.numberOfNodes,
            ownerAccount: this.ownerAccount,
            port: this.port,
            preferredMaintenanceWindow: this.preferredMaintenanceWindow,
            publiclyAccessible: this.publiclyAccessible,
            resourceAction: this.resourceAction,
            revisionTarget: this.revisionTarget,
            rotateEncryptionKey: this.rotateEncryptionKey,
            snapshotClusterIdentifier: this.snapshotClusterIdentifier,
            snapshotCopyGrantName: this.snapshotCopyGrantName,
            snapshotCopyManual: this.snapshotCopyManual,
            snapshotCopyRetentionPeriod: this.snapshotCopyRetentionPeriod,
            snapshotIdentifier: this.snapshotIdentifier,
            tags: this.tags.renderTags(),
            vpcSecurityGroupIds: this.vpcSecurityGroupIds,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnClusterPropsToCloudFormation(props);
    }
}

export namespace CfnCluster {
    /**
     * Describes a connection endpoint.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-cluster-endpoint.html
     */
    export interface EndpointProperty {
        /**
         * The DNS address of the Cluster.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-cluster-endpoint.html#cfn-redshift-cluster-endpoint-address
         */
        readonly address?: string;
        /**
         * The port that the database engine is listening on.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-cluster-endpoint.html#cfn-redshift-cluster-endpoint-port
         */
        readonly port?: string;
    }
}

/**
 * Determine whether the given properties match those of a `EndpointProperty`
 *
 * @param properties - the TypeScript properties of a `EndpointProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_EndpointPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('address', cdk.validateString)(properties.address));
    errors.collect(cdk.propertyValidator('port', cdk.validateString)(properties.port));
    return errors.wrap('supplied properties not correct for "EndpointProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Redshift::Cluster.Endpoint` resource
 *
 * @param properties - the TypeScript properties of a `EndpointProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Redshift::Cluster.Endpoint` resource.
 */
// @ts-ignore TS6133
function cfnClusterEndpointPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_EndpointPropertyValidator(properties).assertSuccess();
    return {
        Address: cdk.stringToCloudFormation(properties.address),
        Port: cdk.stringToCloudFormation(properties.port),
    };
}

// @ts-ignore TS6133
function CfnClusterEndpointPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.EndpointProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.EndpointProperty>();
    ret.addPropertyResult('address', 'Address', properties.Address != null ? cfn_parse.FromCloudFormation.getString(properties.Address) : undefined);
    ret.addPropertyResult('port', 'Port', properties.Port != null ? cfn_parse.FromCloudFormation.getString(properties.Port) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnCluster {
    /**
     * Specifies logging information, such as queries and connection attempts, for the specified Amazon Redshift cluster.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-cluster-loggingproperties.html
     */
    export interface LoggingPropertiesProperty {
        /**
         * The name of an existing S3 bucket where the log files are to be stored.
         *
         * Constraints:
         *
         * - Must be in the same region as the cluster
         * - The cluster must have read bucket and put object permissions
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-cluster-loggingproperties.html#cfn-redshift-cluster-loggingproperties-bucketname
         */
        readonly bucketName: string;
        /**
         * The prefix applied to the log file names.
         *
         * Constraints:
         *
         * - Cannot exceed 512 characters
         * - Cannot contain spaces( ), double quotes ("), single quotes ('), a backslash (\), or control characters. The hexadecimal codes for invalid characters are:
         *
         * - x00 to x20
         * - x22
         * - x27
         * - x5c
         * - x7f or larger
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-cluster-loggingproperties.html#cfn-redshift-cluster-loggingproperties-s3keyprefix
         */
        readonly s3KeyPrefix?: string;
    }
}

/**
 * Determine whether the given properties match those of a `LoggingPropertiesProperty`
 *
 * @param properties - the TypeScript properties of a `LoggingPropertiesProperty`
 *
 * @returns the result of the validation.
 */
function CfnCluster_LoggingPropertiesPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('bucketName', cdk.requiredValidator)(properties.bucketName));
    errors.collect(cdk.propertyValidator('bucketName', cdk.validateString)(properties.bucketName));
    errors.collect(cdk.propertyValidator('s3KeyPrefix', cdk.validateString)(properties.s3KeyPrefix));
    return errors.wrap('supplied properties not correct for "LoggingPropertiesProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Redshift::Cluster.LoggingProperties` resource
 *
 * @param properties - the TypeScript properties of a `LoggingPropertiesProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Redshift::Cluster.LoggingProperties` resource.
 */
// @ts-ignore TS6133
function cfnClusterLoggingPropertiesPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnCluster_LoggingPropertiesPropertyValidator(properties).assertSuccess();
    return {
        BucketName: cdk.stringToCloudFormation(properties.bucketName),
        S3KeyPrefix: cdk.stringToCloudFormation(properties.s3KeyPrefix),
    };
}

// @ts-ignore TS6133
function CfnClusterLoggingPropertiesPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnCluster.LoggingPropertiesProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnCluster.LoggingPropertiesProperty>();
    ret.addPropertyResult('bucketName', 'BucketName', cfn_parse.FromCloudFormation.getString(properties.BucketName));
    ret.addPropertyResult('s3KeyPrefix', 'S3KeyPrefix', properties.S3KeyPrefix != null ? cfn_parse.FromCloudFormation.getString(properties.S3KeyPrefix) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnClusterParameterGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clusterparametergroup.html
 */
export interface CfnClusterParameterGroupProps {

    /**
     * The description of the parameter group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clusterparametergroup.html#cfn-redshift-clusterparametergroup-description
     */
    readonly description: string;

    /**
     * The name of the cluster parameter group family that this cluster parameter group is compatible with.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clusterparametergroup.html#cfn-redshift-clusterparametergroup-parametergroupfamily
     */
    readonly parameterGroupFamily: string;

    /**
     * An array of parameters to be modified. A maximum of 20 parameters can be modified in a single request.
     *
     * For each parameter to be modified, you must supply at least the parameter name and parameter value; other name-value pairs of the parameter are optional.
     *
     * For the workload management (WLM) configuration, you must supply all the name-value pairs in the wlm_json_configuration parameter.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clusterparametergroup.html#cfn-redshift-clusterparametergroup-parameters
     */
    readonly parameters?: Array<CfnClusterParameterGroup.ParameterProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The list of tags for the cluster parameter group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clusterparametergroup.html#cfn-redshift-clusterparametergroup-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnClusterParameterGroupProps`
 *
 * @param properties - the TypeScript properties of a `CfnClusterParameterGroupProps`
 *
 * @returns the result of the validation.
 */
function CfnClusterParameterGroupPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.requiredValidator)(properties.description));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('parameterGroupFamily', cdk.requiredValidator)(properties.parameterGroupFamily));
    errors.collect(cdk.propertyValidator('parameterGroupFamily', cdk.validateString)(properties.parameterGroupFamily));
    errors.collect(cdk.propertyValidator('parameters', cdk.listValidator(CfnClusterParameterGroup_ParameterPropertyValidator))(properties.parameters));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnClusterParameterGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Redshift::ClusterParameterGroup` resource
 *
 * @param properties - the TypeScript properties of a `CfnClusterParameterGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Redshift::ClusterParameterGroup` resource.
 */
// @ts-ignore TS6133
function cfnClusterParameterGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnClusterParameterGroupPropsValidator(properties).assertSuccess();
    return {
        Description: cdk.stringToCloudFormation(properties.description),
        ParameterGroupFamily: cdk.stringToCloudFormation(properties.parameterGroupFamily),
        Parameters: cdk.listMapper(cfnClusterParameterGroupParameterPropertyToCloudFormation)(properties.parameters),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnClusterParameterGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnClusterParameterGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnClusterParameterGroupProps>();
    ret.addPropertyResult('description', 'Description', cfn_parse.FromCloudFormation.getString(properties.Description));
    ret.addPropertyResult('parameterGroupFamily', 'ParameterGroupFamily', cfn_parse.FromCloudFormation.getString(properties.ParameterGroupFamily));
    ret.addPropertyResult('parameters', 'Parameters', properties.Parameters != null ? cfn_parse.FromCloudFormation.getArray(CfnClusterParameterGroupParameterPropertyFromCloudFormation)(properties.Parameters) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Redshift::ClusterParameterGroup`
 *
 * Describes a parameter group.
 *
 * @cloudformationResource AWS::Redshift::ClusterParameterGroup
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clusterparametergroup.html
 */
export class CfnClusterParameterGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Redshift::ClusterParameterGroup";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnClusterParameterGroup {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnClusterParameterGroupPropsFromCloudFormation(resourceProperties);
        const ret = new CfnClusterParameterGroup(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The description of the parameter group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clusterparametergroup.html#cfn-redshift-clusterparametergroup-description
     */
    public description: string;

    /**
     * The name of the cluster parameter group family that this cluster parameter group is compatible with.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clusterparametergroup.html#cfn-redshift-clusterparametergroup-parametergroupfamily
     */
    public parameterGroupFamily: string;

    /**
     * An array of parameters to be modified. A maximum of 20 parameters can be modified in a single request.
     *
     * For each parameter to be modified, you must supply at least the parameter name and parameter value; other name-value pairs of the parameter are optional.
     *
     * For the workload management (WLM) configuration, you must supply all the name-value pairs in the wlm_json_configuration parameter.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clusterparametergroup.html#cfn-redshift-clusterparametergroup-parameters
     */
    public parameters: Array<CfnClusterParameterGroup.ParameterProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * The list of tags for the cluster parameter group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clusterparametergroup.html#cfn-redshift-clusterparametergroup-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Redshift::ClusterParameterGroup`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnClusterParameterGroupProps) {
        super(scope, id, { type: CfnClusterParameterGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'description', this);
        cdk.requireProperty(props, 'parameterGroupFamily', this);

        this.description = props.description;
        this.parameterGroupFamily = props.parameterGroupFamily;
        this.parameters = props.parameters;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Redshift::ClusterParameterGroup", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnClusterParameterGroup.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            description: this.description,
            parameterGroupFamily: this.parameterGroupFamily,
            parameters: this.parameters,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnClusterParameterGroupPropsToCloudFormation(props);
    }
}

export namespace CfnClusterParameterGroup {
    /**
     * Describes a parameter in a cluster parameter group.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-property-redshift-clusterparametergroup-parameter.html
     */
    export interface ParameterProperty {
        /**
         * The name of the parameter.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-property-redshift-clusterparametergroup-parameter.html#cfn-redshift-clusterparametergroup-parameter-parametername
         */
        readonly parameterName: string;
        /**
         * The value of the parameter. If `ParameterName` is `wlm_json_configuration` , then the maximum size of `ParameterValue` is 8000 characters.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-property-redshift-clusterparametergroup-parameter.html#cfn-redshift-clusterparametergroup-parameter-parametervalue
         */
        readonly parameterValue: string;
    }
}

/**
 * Determine whether the given properties match those of a `ParameterProperty`
 *
 * @param properties - the TypeScript properties of a `ParameterProperty`
 *
 * @returns the result of the validation.
 */
function CfnClusterParameterGroup_ParameterPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('parameterName', cdk.requiredValidator)(properties.parameterName));
    errors.collect(cdk.propertyValidator('parameterName', cdk.validateString)(properties.parameterName));
    errors.collect(cdk.propertyValidator('parameterValue', cdk.requiredValidator)(properties.parameterValue));
    errors.collect(cdk.propertyValidator('parameterValue', cdk.validateString)(properties.parameterValue));
    return errors.wrap('supplied properties not correct for "ParameterProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Redshift::ClusterParameterGroup.Parameter` resource
 *
 * @param properties - the TypeScript properties of a `ParameterProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Redshift::ClusterParameterGroup.Parameter` resource.
 */
// @ts-ignore TS6133
function cfnClusterParameterGroupParameterPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnClusterParameterGroup_ParameterPropertyValidator(properties).assertSuccess();
    return {
        ParameterName: cdk.stringToCloudFormation(properties.parameterName),
        ParameterValue: cdk.stringToCloudFormation(properties.parameterValue),
    };
}

// @ts-ignore TS6133
function CfnClusterParameterGroupParameterPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnClusterParameterGroup.ParameterProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnClusterParameterGroup.ParameterProperty>();
    ret.addPropertyResult('parameterName', 'ParameterName', cfn_parse.FromCloudFormation.getString(properties.ParameterName));
    ret.addPropertyResult('parameterValue', 'ParameterValue', cfn_parse.FromCloudFormation.getString(properties.ParameterValue));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnClusterSecurityGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersecuritygroup.html
 */
export interface CfnClusterSecurityGroupProps {

    /**
     * A description for the security group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersecuritygroup.html#cfn-redshift-clustersecuritygroup-description
     */
    readonly description: string;

    /**
     * Specifies an arbitrary set of tags (key–value pairs) to associate with this security group. Use tags to manage your resources.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersecuritygroup.html#cfn-redshift-clustersecuritygroup-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnClusterSecurityGroupProps`
 *
 * @param properties - the TypeScript properties of a `CfnClusterSecurityGroupProps`
 *
 * @returns the result of the validation.
 */
function CfnClusterSecurityGroupPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.requiredValidator)(properties.description));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnClusterSecurityGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Redshift::ClusterSecurityGroup` resource
 *
 * @param properties - the TypeScript properties of a `CfnClusterSecurityGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Redshift::ClusterSecurityGroup` resource.
 */
// @ts-ignore TS6133
function cfnClusterSecurityGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnClusterSecurityGroupPropsValidator(properties).assertSuccess();
    return {
        Description: cdk.stringToCloudFormation(properties.description),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnClusterSecurityGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnClusterSecurityGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnClusterSecurityGroupProps>();
    ret.addPropertyResult('description', 'Description', cfn_parse.FromCloudFormation.getString(properties.Description));
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Redshift::ClusterSecurityGroup`
 *
 * Specifies a new Amazon Redshift security group. You use security groups to control access to non-VPC clusters.
 *
 * For information about managing security groups, go to [Amazon Redshift Cluster Security Groups](https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-security-groups.html) in the *Amazon Redshift Cluster Management Guide* .
 *
 * @cloudformationResource AWS::Redshift::ClusterSecurityGroup
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersecuritygroup.html
 */
export class CfnClusterSecurityGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Redshift::ClusterSecurityGroup";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnClusterSecurityGroup {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnClusterSecurityGroupPropsFromCloudFormation(resourceProperties);
        const ret = new CfnClusterSecurityGroup(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * A description for the security group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersecuritygroup.html#cfn-redshift-clustersecuritygroup-description
     */
    public description: string;

    /**
     * Specifies an arbitrary set of tags (key–value pairs) to associate with this security group. Use tags to manage your resources.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersecuritygroup.html#cfn-redshift-clustersecuritygroup-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Redshift::ClusterSecurityGroup`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnClusterSecurityGroupProps) {
        super(scope, id, { type: CfnClusterSecurityGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'description', this);

        this.description = props.description;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Redshift::ClusterSecurityGroup", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnClusterSecurityGroup.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            description: this.description,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnClusterSecurityGroupPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnClusterSecurityGroupIngress`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersecuritygroupingress.html
 */
export interface CfnClusterSecurityGroupIngressProps {

    /**
     * The name of the security group to which the ingress rule is added.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersecuritygroupingress.html#cfn-redshift-clustersecuritygroupingress-clustersecuritygroupname
     */
    readonly clusterSecurityGroupName: string;

    /**
     * The IP range to be added the Amazon Redshift security group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersecuritygroupingress.html#cfn-redshift-clustersecuritygroupingress-cidrip
     */
    readonly cidrip?: string;

    /**
     * The EC2 security group to be added the Amazon Redshift security group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersecuritygroupingress.html#cfn-redshift-clustersecuritygroupingress-ec2securitygroupname
     */
    readonly ec2SecurityGroupName?: string;

    /**
     * The AWS account number of the owner of the security group specified by the *EC2SecurityGroupName* parameter. The AWS Access Key ID is not an acceptable value.
     *
     * Example: `111122223333`
     *
     * Conditional. If you specify the `EC2SecurityGroupName` property, you must specify this property.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersecuritygroupingress.html#cfn-redshift-clustersecuritygroupingress-ec2securitygroupownerid
     */
    readonly ec2SecurityGroupOwnerId?: string;
}

/**
 * Determine whether the given properties match those of a `CfnClusterSecurityGroupIngressProps`
 *
 * @param properties - the TypeScript properties of a `CfnClusterSecurityGroupIngressProps`
 *
 * @returns the result of the validation.
 */
function CfnClusterSecurityGroupIngressPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('cidrip', cdk.validateString)(properties.cidrip));
    errors.collect(cdk.propertyValidator('clusterSecurityGroupName', cdk.requiredValidator)(properties.clusterSecurityGroupName));
    errors.collect(cdk.propertyValidator('clusterSecurityGroupName', cdk.validateString)(properties.clusterSecurityGroupName));
    errors.collect(cdk.propertyValidator('ec2SecurityGroupName', cdk.validateString)(properties.ec2SecurityGroupName));
    errors.collect(cdk.propertyValidator('ec2SecurityGroupOwnerId', cdk.validateString)(properties.ec2SecurityGroupOwnerId));
    return errors.wrap('supplied properties not correct for "CfnClusterSecurityGroupIngressProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Redshift::ClusterSecurityGroupIngress` resource
 *
 * @param properties - the TypeScript properties of a `CfnClusterSecurityGroupIngressProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Redshift::ClusterSecurityGroupIngress` resource.
 */
// @ts-ignore TS6133
function cfnClusterSecurityGroupIngressPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnClusterSecurityGroupIngressPropsValidator(properties).assertSuccess();
    return {
        ClusterSecurityGroupName: cdk.stringToCloudFormation(properties.clusterSecurityGroupName),
        CIDRIP: cdk.stringToCloudFormation(properties.cidrip),
        EC2SecurityGroupName: cdk.stringToCloudFormation(properties.ec2SecurityGroupName),
        EC2SecurityGroupOwnerId: cdk.stringToCloudFormation(properties.ec2SecurityGroupOwnerId),
    };
}

// @ts-ignore TS6133
function CfnClusterSecurityGroupIngressPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnClusterSecurityGroupIngressProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnClusterSecurityGroupIngressProps>();
    ret.addPropertyResult('clusterSecurityGroupName', 'ClusterSecurityGroupName', cfn_parse.FromCloudFormation.getString(properties.ClusterSecurityGroupName));
    ret.addPropertyResult('cidrip', 'CIDRIP', properties.CIDRIP != null ? cfn_parse.FromCloudFormation.getString(properties.CIDRIP) : undefined);
    ret.addPropertyResult('ec2SecurityGroupName', 'EC2SecurityGroupName', properties.EC2SecurityGroupName != null ? cfn_parse.FromCloudFormation.getString(properties.EC2SecurityGroupName) : undefined);
    ret.addPropertyResult('ec2SecurityGroupOwnerId', 'EC2SecurityGroupOwnerId', properties.EC2SecurityGroupOwnerId != null ? cfn_parse.FromCloudFormation.getString(properties.EC2SecurityGroupOwnerId) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Redshift::ClusterSecurityGroupIngress`
 *
 * Adds an inbound (ingress) rule to an Amazon Redshift security group. Depending on whether the application accessing your cluster is running on the Internet or an Amazon EC2 instance, you can authorize inbound access to either a Classless Interdomain Routing (CIDR)/Internet Protocol (IP) range or to an Amazon EC2 security group. You can add as many as 20 ingress rules to an Amazon Redshift security group.
 *
 * If you authorize access to an Amazon EC2 security group, specify *EC2SecurityGroupName* and *EC2SecurityGroupOwnerId* . The Amazon EC2 security group and Amazon Redshift cluster must be in the same AWS Region .
 *
 * If you authorize access to a CIDR/IP address range, specify *CIDRIP* . For an overview of CIDR blocks, see the Wikipedia article on [Classless Inter-Domain Routing](https://docs.aws.amazon.com/http://en.wikipedia.org/wiki/Classless_Inter-Domain_Routing) .
 *
 * You must also associate the security group with a cluster so that clients running on these IP addresses or the EC2 instance are authorized to connect to the cluster. For information about managing security groups, go to [Working with Security Groups](https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-security-groups.html) in the *Amazon Redshift Cluster Management Guide* .
 *
 * @cloudformationResource AWS::Redshift::ClusterSecurityGroupIngress
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersecuritygroupingress.html
 */
export class CfnClusterSecurityGroupIngress extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Redshift::ClusterSecurityGroupIngress";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnClusterSecurityGroupIngress {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnClusterSecurityGroupIngressPropsFromCloudFormation(resourceProperties);
        const ret = new CfnClusterSecurityGroupIngress(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the security group to which the ingress rule is added.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersecuritygroupingress.html#cfn-redshift-clustersecuritygroupingress-clustersecuritygroupname
     */
    public clusterSecurityGroupName: string;

    /**
     * The IP range to be added the Amazon Redshift security group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersecuritygroupingress.html#cfn-redshift-clustersecuritygroupingress-cidrip
     */
    public cidrip: string | undefined;

    /**
     * The EC2 security group to be added the Amazon Redshift security group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersecuritygroupingress.html#cfn-redshift-clustersecuritygroupingress-ec2securitygroupname
     */
    public ec2SecurityGroupName: string | undefined;

    /**
     * The AWS account number of the owner of the security group specified by the *EC2SecurityGroupName* parameter. The AWS Access Key ID is not an acceptable value.
     *
     * Example: `111122223333`
     *
     * Conditional. If you specify the `EC2SecurityGroupName` property, you must specify this property.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersecuritygroupingress.html#cfn-redshift-clustersecuritygroupingress-ec2securitygroupownerid
     */
    public ec2SecurityGroupOwnerId: string | undefined;

    /**
     * Create a new `AWS::Redshift::ClusterSecurityGroupIngress`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnClusterSecurityGroupIngressProps) {
        super(scope, id, { type: CfnClusterSecurityGroupIngress.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'clusterSecurityGroupName', this);

        this.clusterSecurityGroupName = props.clusterSecurityGroupName;
        this.cidrip = props.cidrip;
        this.ec2SecurityGroupName = props.ec2SecurityGroupName;
        this.ec2SecurityGroupOwnerId = props.ec2SecurityGroupOwnerId;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnClusterSecurityGroupIngress.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            clusterSecurityGroupName: this.clusterSecurityGroupName,
            cidrip: this.cidrip,
            ec2SecurityGroupName: this.ec2SecurityGroupName,
            ec2SecurityGroupOwnerId: this.ec2SecurityGroupOwnerId,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnClusterSecurityGroupIngressPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnClusterSubnetGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersubnetgroup.html
 */
export interface CfnClusterSubnetGroupProps {

    /**
     * A description for the subnet group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersubnetgroup.html#cfn-redshift-clustersubnetgroup-description
     */
    readonly description: string;

    /**
     * An array of VPC subnet IDs. A maximum of 20 subnets can be modified in a single request.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersubnetgroup.html#cfn-redshift-clustersubnetgroup-subnetids
     */
    readonly subnetIds: string[];

    /**
     * Specifies an arbitrary set of tags (key–value pairs) to associate with this subnet group. Use tags to manage your resources.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersubnetgroup.html#cfn-redshift-clustersubnetgroup-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnClusterSubnetGroupProps`
 *
 * @param properties - the TypeScript properties of a `CfnClusterSubnetGroupProps`
 *
 * @returns the result of the validation.
 */
function CfnClusterSubnetGroupPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.requiredValidator)(properties.description));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('subnetIds', cdk.requiredValidator)(properties.subnetIds));
    errors.collect(cdk.propertyValidator('subnetIds', cdk.listValidator(cdk.validateString))(properties.subnetIds));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnClusterSubnetGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Redshift::ClusterSubnetGroup` resource
 *
 * @param properties - the TypeScript properties of a `CfnClusterSubnetGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Redshift::ClusterSubnetGroup` resource.
 */
// @ts-ignore TS6133
function cfnClusterSubnetGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnClusterSubnetGroupPropsValidator(properties).assertSuccess();
    return {
        Description: cdk.stringToCloudFormation(properties.description),
        SubnetIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.subnetIds),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnClusterSubnetGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnClusterSubnetGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnClusterSubnetGroupProps>();
    ret.addPropertyResult('description', 'Description', cfn_parse.FromCloudFormation.getString(properties.Description));
    ret.addPropertyResult('subnetIds', 'SubnetIds', cfn_parse.FromCloudFormation.getStringArray(properties.SubnetIds));
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Redshift::ClusterSubnetGroup`
 *
 * Specifies an Amazon Redshift subnet group. You must provide a list of one or more subnets in your existing Amazon Virtual Private Cloud ( Amazon VPC ) when creating Amazon Redshift subnet group.
 *
 * For information about subnet groups, go to [Amazon Redshift Cluster Subnet Groups](https://docs.aws.amazon.com/redshift/latest/mgmt/working-with-cluster-subnet-groups.html) in the *Amazon Redshift Cluster Management Guide* .
 *
 * @cloudformationResource AWS::Redshift::ClusterSubnetGroup
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersubnetgroup.html
 */
export class CfnClusterSubnetGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Redshift::ClusterSubnetGroup";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnClusterSubnetGroup {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnClusterSubnetGroupPropsFromCloudFormation(resourceProperties);
        const ret = new CfnClusterSubnetGroup(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * A description for the subnet group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersubnetgroup.html#cfn-redshift-clustersubnetgroup-description
     */
    public description: string;

    /**
     * An array of VPC subnet IDs. A maximum of 20 subnets can be modified in a single request.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersubnetgroup.html#cfn-redshift-clustersubnetgroup-subnetids
     */
    public subnetIds: string[];

    /**
     * Specifies an arbitrary set of tags (key–value pairs) to associate with this subnet group. Use tags to manage your resources.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-clustersubnetgroup.html#cfn-redshift-clustersubnetgroup-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Redshift::ClusterSubnetGroup`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnClusterSubnetGroupProps) {
        super(scope, id, { type: CfnClusterSubnetGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'description', this);
        cdk.requireProperty(props, 'subnetIds', this);

        this.description = props.description;
        this.subnetIds = props.subnetIds;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Redshift::ClusterSubnetGroup", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnClusterSubnetGroup.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            description: this.description,
            subnetIds: this.subnetIds,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnClusterSubnetGroupPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnEndpointAccess`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointaccess.html
 */
export interface CfnEndpointAccessProps {

    /**
     * The name of the endpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointaccess.html#cfn-redshift-endpointaccess-endpointname
     */
    readonly endpointName: string;

    /**
     * The security group that defines the ports, protocols, and sources for inbound traffic that you are authorizing into your endpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointaccess.html#cfn-redshift-endpointaccess-vpcsecuritygroupids
     */
    readonly vpcSecurityGroupIds: string[];

    /**
     * The cluster identifier of the cluster associated with the endpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointaccess.html#cfn-redshift-endpointaccess-clusteridentifier
     */
    readonly clusterIdentifier?: string;

    /**
     * The AWS account ID of the owner of the cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointaccess.html#cfn-redshift-endpointaccess-resourceowner
     */
    readonly resourceOwner?: string;

    /**
     * The subnet group name where Amazon Redshift chooses to deploy the endpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointaccess.html#cfn-redshift-endpointaccess-subnetgroupname
     */
    readonly subnetGroupName?: string;
}

/**
 * Determine whether the given properties match those of a `CfnEndpointAccessProps`
 *
 * @param properties - the TypeScript properties of a `CfnEndpointAccessProps`
 *
 * @returns the result of the validation.
 */
function CfnEndpointAccessPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('clusterIdentifier', cdk.validateString)(properties.clusterIdentifier));
    errors.collect(cdk.propertyValidator('endpointName', cdk.requiredValidator)(properties.endpointName));
    errors.collect(cdk.propertyValidator('endpointName', cdk.validateString)(properties.endpointName));
    errors.collect(cdk.propertyValidator('resourceOwner', cdk.validateString)(properties.resourceOwner));
    errors.collect(cdk.propertyValidator('subnetGroupName', cdk.validateString)(properties.subnetGroupName));
    errors.collect(cdk.propertyValidator('vpcSecurityGroupIds', cdk.requiredValidator)(properties.vpcSecurityGroupIds));
    errors.collect(cdk.propertyValidator('vpcSecurityGroupIds', cdk.listValidator(cdk.validateString))(properties.vpcSecurityGroupIds));
    return errors.wrap('supplied properties not correct for "CfnEndpointAccessProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Redshift::EndpointAccess` resource
 *
 * @param properties - the TypeScript properties of a `CfnEndpointAccessProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Redshift::EndpointAccess` resource.
 */
// @ts-ignore TS6133
function cfnEndpointAccessPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpointAccessPropsValidator(properties).assertSuccess();
    return {
        EndpointName: cdk.stringToCloudFormation(properties.endpointName),
        VpcSecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.vpcSecurityGroupIds),
        ClusterIdentifier: cdk.stringToCloudFormation(properties.clusterIdentifier),
        ResourceOwner: cdk.stringToCloudFormation(properties.resourceOwner),
        SubnetGroupName: cdk.stringToCloudFormation(properties.subnetGroupName),
    };
}

// @ts-ignore TS6133
function CfnEndpointAccessPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpointAccessProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpointAccessProps>();
    ret.addPropertyResult('endpointName', 'EndpointName', cfn_parse.FromCloudFormation.getString(properties.EndpointName));
    ret.addPropertyResult('vpcSecurityGroupIds', 'VpcSecurityGroupIds', cfn_parse.FromCloudFormation.getStringArray(properties.VpcSecurityGroupIds));
    ret.addPropertyResult('clusterIdentifier', 'ClusterIdentifier', properties.ClusterIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.ClusterIdentifier) : undefined);
    ret.addPropertyResult('resourceOwner', 'ResourceOwner', properties.ResourceOwner != null ? cfn_parse.FromCloudFormation.getString(properties.ResourceOwner) : undefined);
    ret.addPropertyResult('subnetGroupName', 'SubnetGroupName', properties.SubnetGroupName != null ? cfn_parse.FromCloudFormation.getString(properties.SubnetGroupName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Redshift::EndpointAccess`
 *
 * Creates a Redshift-managed VPC endpoint.
 *
 * @cloudformationResource AWS::Redshift::EndpointAccess
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointaccess.html
 */
export class CfnEndpointAccess extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Redshift::EndpointAccess";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnEndpointAccess {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnEndpointAccessPropsFromCloudFormation(resourceProperties);
        const ret = new CfnEndpointAccess(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The DNS address of the endpoint.
     * @cloudformationAttribute Address
     */
    public readonly attrAddress: string;

    /**
     * The time (UTC) that the endpoint was created.
     * @cloudformationAttribute EndpointCreateTime
     */
    public readonly attrEndpointCreateTime: string;

    /**
     * The status of the endpoint.
     * @cloudformationAttribute EndpointStatus
     */
    public readonly attrEndpointStatus: string;

    /**
     * The port number on which the cluster accepts incoming connections.
     * @cloudformationAttribute Port
     */
    public readonly attrPort: number;

    /**
     *
     * @cloudformationAttribute VpcSecurityGroups
     */
    public readonly attrVpcSecurityGroups: cdk.IResolvable;

    /**
     * The name of the endpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointaccess.html#cfn-redshift-endpointaccess-endpointname
     */
    public endpointName: string;

    /**
     * The security group that defines the ports, protocols, and sources for inbound traffic that you are authorizing into your endpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointaccess.html#cfn-redshift-endpointaccess-vpcsecuritygroupids
     */
    public vpcSecurityGroupIds: string[];

    /**
     * The cluster identifier of the cluster associated with the endpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointaccess.html#cfn-redshift-endpointaccess-clusteridentifier
     */
    public clusterIdentifier: string | undefined;

    /**
     * The AWS account ID of the owner of the cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointaccess.html#cfn-redshift-endpointaccess-resourceowner
     */
    public resourceOwner: string | undefined;

    /**
     * The subnet group name where Amazon Redshift chooses to deploy the endpoint.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointaccess.html#cfn-redshift-endpointaccess-subnetgroupname
     */
    public subnetGroupName: string | undefined;

    /**
     * Create a new `AWS::Redshift::EndpointAccess`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnEndpointAccessProps) {
        super(scope, id, { type: CfnEndpointAccess.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'endpointName', this);
        cdk.requireProperty(props, 'vpcSecurityGroupIds', this);
        this.attrAddress = cdk.Token.asString(this.getAtt('Address'));
        this.attrEndpointCreateTime = cdk.Token.asString(this.getAtt('EndpointCreateTime'));
        this.attrEndpointStatus = cdk.Token.asString(this.getAtt('EndpointStatus'));
        this.attrPort = cdk.Token.asNumber(this.getAtt('Port'));
        this.attrVpcSecurityGroups = this.getAtt('VpcSecurityGroups');

        this.endpointName = props.endpointName;
        this.vpcSecurityGroupIds = props.vpcSecurityGroupIds;
        this.clusterIdentifier = props.clusterIdentifier;
        this.resourceOwner = props.resourceOwner;
        this.subnetGroupName = props.subnetGroupName;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnEndpointAccess.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            endpointName: this.endpointName,
            vpcSecurityGroupIds: this.vpcSecurityGroupIds,
            clusterIdentifier: this.clusterIdentifier,
            resourceOwner: this.resourceOwner,
            subnetGroupName: this.subnetGroupName,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnEndpointAccessPropsToCloudFormation(props);
    }
}

export namespace CfnEndpointAccess {
    /**
     * The security groups associated with the endpoint.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-endpointaccess-vpcsecuritygroup.html
     */
    export interface VpcSecurityGroupProperty {
        /**
         * The status of the endpoint.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-endpointaccess-vpcsecuritygroup.html#cfn-redshift-endpointaccess-vpcsecuritygroup-status
         */
        readonly status?: string;
        /**
         * The identifier of the VPC security group.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-endpointaccess-vpcsecuritygroup.html#cfn-redshift-endpointaccess-vpcsecuritygroup-vpcsecuritygroupid
         */
        readonly vpcSecurityGroupId?: string;
    }
}

/**
 * Determine whether the given properties match those of a `VpcSecurityGroupProperty`
 *
 * @param properties - the TypeScript properties of a `VpcSecurityGroupProperty`
 *
 * @returns the result of the validation.
 */
function CfnEndpointAccess_VpcSecurityGroupPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('status', cdk.validateString)(properties.status));
    errors.collect(cdk.propertyValidator('vpcSecurityGroupId', cdk.validateString)(properties.vpcSecurityGroupId));
    return errors.wrap('supplied properties not correct for "VpcSecurityGroupProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Redshift::EndpointAccess.VpcSecurityGroup` resource
 *
 * @param properties - the TypeScript properties of a `VpcSecurityGroupProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Redshift::EndpointAccess.VpcSecurityGroup` resource.
 */
// @ts-ignore TS6133
function cfnEndpointAccessVpcSecurityGroupPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpointAccess_VpcSecurityGroupPropertyValidator(properties).assertSuccess();
    return {
        Status: cdk.stringToCloudFormation(properties.status),
        VpcSecurityGroupId: cdk.stringToCloudFormation(properties.vpcSecurityGroupId),
    };
}

// @ts-ignore TS6133
function CfnEndpointAccessVpcSecurityGroupPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpointAccess.VpcSecurityGroupProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpointAccess.VpcSecurityGroupProperty>();
    ret.addPropertyResult('status', 'Status', properties.Status != null ? cfn_parse.FromCloudFormation.getString(properties.Status) : undefined);
    ret.addPropertyResult('vpcSecurityGroupId', 'VpcSecurityGroupId', properties.VpcSecurityGroupId != null ? cfn_parse.FromCloudFormation.getString(properties.VpcSecurityGroupId) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnEndpointAuthorization`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointauthorization.html
 */
export interface CfnEndpointAuthorizationProps {

    /**
     * The A AWS account ID of either the cluster owner (grantor) or grantee. If `Grantee` parameter is true, then the `Account` value is of the grantor.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointauthorization.html#cfn-redshift-endpointauthorization-account
     */
    readonly account: string;

    /**
     * The cluster identifier.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointauthorization.html#cfn-redshift-endpointauthorization-clusteridentifier
     */
    readonly clusterIdentifier: string;

    /**
     * Indicates whether to force the revoke action. If true, the Redshift-managed VPC endpoints associated with the endpoint authorization are also deleted.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointauthorization.html#cfn-redshift-endpointauthorization-force
     */
    readonly force?: boolean | cdk.IResolvable;

    /**
     * The virtual private cloud (VPC) identifiers to grant access to.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointauthorization.html#cfn-redshift-endpointauthorization-vpcids
     */
    readonly vpcIds?: string[];
}

/**
 * Determine whether the given properties match those of a `CfnEndpointAuthorizationProps`
 *
 * @param properties - the TypeScript properties of a `CfnEndpointAuthorizationProps`
 *
 * @returns the result of the validation.
 */
function CfnEndpointAuthorizationPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('account', cdk.requiredValidator)(properties.account));
    errors.collect(cdk.propertyValidator('account', cdk.validateString)(properties.account));
    errors.collect(cdk.propertyValidator('clusterIdentifier', cdk.requiredValidator)(properties.clusterIdentifier));
    errors.collect(cdk.propertyValidator('clusterIdentifier', cdk.validateString)(properties.clusterIdentifier));
    errors.collect(cdk.propertyValidator('force', cdk.validateBoolean)(properties.force));
    errors.collect(cdk.propertyValidator('vpcIds', cdk.listValidator(cdk.validateString))(properties.vpcIds));
    return errors.wrap('supplied properties not correct for "CfnEndpointAuthorizationProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Redshift::EndpointAuthorization` resource
 *
 * @param properties - the TypeScript properties of a `CfnEndpointAuthorizationProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Redshift::EndpointAuthorization` resource.
 */
// @ts-ignore TS6133
function cfnEndpointAuthorizationPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEndpointAuthorizationPropsValidator(properties).assertSuccess();
    return {
        Account: cdk.stringToCloudFormation(properties.account),
        ClusterIdentifier: cdk.stringToCloudFormation(properties.clusterIdentifier),
        Force: cdk.booleanToCloudFormation(properties.force),
        VpcIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.vpcIds),
    };
}

// @ts-ignore TS6133
function CfnEndpointAuthorizationPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEndpointAuthorizationProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEndpointAuthorizationProps>();
    ret.addPropertyResult('account', 'Account', cfn_parse.FromCloudFormation.getString(properties.Account));
    ret.addPropertyResult('clusterIdentifier', 'ClusterIdentifier', cfn_parse.FromCloudFormation.getString(properties.ClusterIdentifier));
    ret.addPropertyResult('force', 'Force', properties.Force != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Force) : undefined);
    ret.addPropertyResult('vpcIds', 'VpcIds', properties.VpcIds != null ? cfn_parse.FromCloudFormation.getStringArray(properties.VpcIds) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Redshift::EndpointAuthorization`
 *
 * Describes an endpoint authorization for authorizing Redshift-managed VPC endpoint access to a cluster across AWS accounts .
 *
 * @cloudformationResource AWS::Redshift::EndpointAuthorization
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointauthorization.html
 */
export class CfnEndpointAuthorization extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Redshift::EndpointAuthorization";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnEndpointAuthorization {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnEndpointAuthorizationPropsFromCloudFormation(resourceProperties);
        const ret = new CfnEndpointAuthorization(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Indicates whether all VPCs in the grantee account are allowed access to the cluster.
     * @cloudformationAttribute AllowedAllVPCs
     */
    public readonly attrAllowedAllVpCs: cdk.IResolvable;

    /**
     * The VPCs allowed access to the cluster.
     * @cloudformationAttribute AllowedVPCs
     */
    public readonly attrAllowedVpCs: string[];

    /**
     * The time (UTC) when the authorization was created.
     * @cloudformationAttribute AuthorizeTime
     */
    public readonly attrAuthorizeTime: string;

    /**
     * The status of the cluster.
     * @cloudformationAttribute ClusterStatus
     */
    public readonly attrClusterStatus: string;

    /**
     * The number of Redshift-managed VPC endpoints created for the authorization.
     * @cloudformationAttribute EndpointCount
     */
    public readonly attrEndpointCount: number;

    /**
     * The AWS account ID of the grantee of the cluster.
     * @cloudformationAttribute Grantee
     */
    public readonly attrGrantee: string;

    /**
     * The AWS account ID of the cluster owner.
     * @cloudformationAttribute Grantor
     */
    public readonly attrGrantor: string;

    /**
     * The status of the authorization action.
     * @cloudformationAttribute Status
     */
    public readonly attrStatus: string;

    /**
     * The A AWS account ID of either the cluster owner (grantor) or grantee. If `Grantee` parameter is true, then the `Account` value is of the grantor.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointauthorization.html#cfn-redshift-endpointauthorization-account
     */
    public account: string;

    /**
     * The cluster identifier.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointauthorization.html#cfn-redshift-endpointauthorization-clusteridentifier
     */
    public clusterIdentifier: string;

    /**
     * Indicates whether to force the revoke action. If true, the Redshift-managed VPC endpoints associated with the endpoint authorization are also deleted.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointauthorization.html#cfn-redshift-endpointauthorization-force
     */
    public force: boolean | cdk.IResolvable | undefined;

    /**
     * The virtual private cloud (VPC) identifiers to grant access to.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-endpointauthorization.html#cfn-redshift-endpointauthorization-vpcids
     */
    public vpcIds: string[] | undefined;

    /**
     * Create a new `AWS::Redshift::EndpointAuthorization`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnEndpointAuthorizationProps) {
        super(scope, id, { type: CfnEndpointAuthorization.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'account', this);
        cdk.requireProperty(props, 'clusterIdentifier', this);
        this.attrAllowedAllVpCs = this.getAtt('AllowedAllVPCs');
        this.attrAllowedVpCs = cdk.Token.asList(this.getAtt('AllowedVPCs'));
        this.attrAuthorizeTime = cdk.Token.asString(this.getAtt('AuthorizeTime'));
        this.attrClusterStatus = cdk.Token.asString(this.getAtt('ClusterStatus'));
        this.attrEndpointCount = cdk.Token.asNumber(this.getAtt('EndpointCount'));
        this.attrGrantee = cdk.Token.asString(this.getAtt('Grantee'));
        this.attrGrantor = cdk.Token.asString(this.getAtt('Grantor'));
        this.attrStatus = cdk.Token.asString(this.getAtt('Status'));

        this.account = props.account;
        this.clusterIdentifier = props.clusterIdentifier;
        this.force = props.force;
        this.vpcIds = props.vpcIds;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnEndpointAuthorization.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            account: this.account,
            clusterIdentifier: this.clusterIdentifier,
            force: this.force,
            vpcIds: this.vpcIds,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnEndpointAuthorizationPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnEventSubscription`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-eventsubscription.html
 */
export interface CfnEventSubscriptionProps {

    /**
     * The name of the event subscription to be created.
     *
     * Constraints:
     *
     * - Cannot be null, empty, or blank.
     * - Must contain from 1 to 255 alphanumeric characters or hyphens.
     * - First character must be a letter.
     * - Cannot end with a hyphen or contain two consecutive hyphens.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-eventsubscription.html#cfn-redshift-eventsubscription-subscriptionname
     */
    readonly subscriptionName: string;

    /**
     * A boolean value; set to `true` to activate the subscription, and set to `false` to create the subscription but not activate it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-eventsubscription.html#cfn-redshift-eventsubscription-enabled
     */
    readonly enabled?: boolean | cdk.IResolvable;

    /**
     * Specifies the Amazon Redshift event categories to be published by the event notification subscription.
     *
     * Values: configuration, management, monitoring, security, pending
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-eventsubscription.html#cfn-redshift-eventsubscription-eventcategories
     */
    readonly eventCategories?: string[];

    /**
     * Specifies the Amazon Redshift event severity to be published by the event notification subscription.
     *
     * Values: ERROR, INFO
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-eventsubscription.html#cfn-redshift-eventsubscription-severity
     */
    readonly severity?: string;

    /**
     * The Amazon Resource Name (ARN) of the Amazon SNS topic used to transmit the event notifications. The ARN is created by Amazon SNS when you create a topic and subscribe to it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-eventsubscription.html#cfn-redshift-eventsubscription-snstopicarn
     */
    readonly snsTopicArn?: string;

    /**
     * A list of one or more identifiers of Amazon Redshift source objects. All of the objects must be of the same type as was specified in the source type parameter. The event subscription will return only events generated by the specified objects. If not specified, then events are returned for all objects within the source type specified.
     *
     * Example: my-cluster-1, my-cluster-2
     *
     * Example: my-snapshot-20131010
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-eventsubscription.html#cfn-redshift-eventsubscription-sourceids
     */
    readonly sourceIds?: string[];

    /**
     * The type of source that will be generating the events. For example, if you want to be notified of events generated by a cluster, you would set this parameter to cluster. If this value is not specified, events are returned for all Amazon Redshift objects in your AWS account . You must specify a source type in order to specify source IDs.
     *
     * Valid values: cluster, cluster-parameter-group, cluster-security-group, cluster-snapshot, and scheduled-action.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-eventsubscription.html#cfn-redshift-eventsubscription-sourcetype
     */
    readonly sourceType?: string;

    /**
     * A list of tag instances.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-eventsubscription.html#cfn-redshift-eventsubscription-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnEventSubscriptionProps`
 *
 * @param properties - the TypeScript properties of a `CfnEventSubscriptionProps`
 *
 * @returns the result of the validation.
 */
function CfnEventSubscriptionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enabled', cdk.validateBoolean)(properties.enabled));
    errors.collect(cdk.propertyValidator('eventCategories', cdk.listValidator(cdk.validateString))(properties.eventCategories));
    errors.collect(cdk.propertyValidator('severity', cdk.validateString)(properties.severity));
    errors.collect(cdk.propertyValidator('snsTopicArn', cdk.validateString)(properties.snsTopicArn));
    errors.collect(cdk.propertyValidator('sourceIds', cdk.listValidator(cdk.validateString))(properties.sourceIds));
    errors.collect(cdk.propertyValidator('sourceType', cdk.validateString)(properties.sourceType));
    errors.collect(cdk.propertyValidator('subscriptionName', cdk.requiredValidator)(properties.subscriptionName));
    errors.collect(cdk.propertyValidator('subscriptionName', cdk.validateString)(properties.subscriptionName));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnEventSubscriptionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Redshift::EventSubscription` resource
 *
 * @param properties - the TypeScript properties of a `CfnEventSubscriptionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Redshift::EventSubscription` resource.
 */
// @ts-ignore TS6133
function cfnEventSubscriptionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEventSubscriptionPropsValidator(properties).assertSuccess();
    return {
        SubscriptionName: cdk.stringToCloudFormation(properties.subscriptionName),
        Enabled: cdk.booleanToCloudFormation(properties.enabled),
        EventCategories: cdk.listMapper(cdk.stringToCloudFormation)(properties.eventCategories),
        Severity: cdk.stringToCloudFormation(properties.severity),
        SnsTopicArn: cdk.stringToCloudFormation(properties.snsTopicArn),
        SourceIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.sourceIds),
        SourceType: cdk.stringToCloudFormation(properties.sourceType),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnEventSubscriptionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEventSubscriptionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEventSubscriptionProps>();
    ret.addPropertyResult('subscriptionName', 'SubscriptionName', cfn_parse.FromCloudFormation.getString(properties.SubscriptionName));
    ret.addPropertyResult('enabled', 'Enabled', properties.Enabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Enabled) : undefined);
    ret.addPropertyResult('eventCategories', 'EventCategories', properties.EventCategories != null ? cfn_parse.FromCloudFormation.getStringArray(properties.EventCategories) : undefined);
    ret.addPropertyResult('severity', 'Severity', properties.Severity != null ? cfn_parse.FromCloudFormation.getString(properties.Severity) : undefined);
    ret.addPropertyResult('snsTopicArn', 'SnsTopicArn', properties.SnsTopicArn != null ? cfn_parse.FromCloudFormation.getString(properties.SnsTopicArn) : undefined);
    ret.addPropertyResult('sourceIds', 'SourceIds', properties.SourceIds != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SourceIds) : undefined);
    ret.addPropertyResult('sourceType', 'SourceType', properties.SourceType != null ? cfn_parse.FromCloudFormation.getString(properties.SourceType) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Redshift::EventSubscription`
 *
 *
 *
 * @cloudformationResource AWS::Redshift::EventSubscription
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-eventsubscription.html
 */
export class CfnEventSubscription extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Redshift::EventSubscription";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnEventSubscription {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnEventSubscriptionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnEventSubscription(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the Amazon Redshift event notification subscription.
     * @cloudformationAttribute CustSubscriptionId
     */
    public readonly attrCustSubscriptionId: string;

    /**
     * The AWS account associated with the Amazon Redshift event notification subscription.
     * @cloudformationAttribute CustomerAwsId
     */
    public readonly attrCustomerAwsId: string;

    /**
     * The list of Amazon Redshift event categories specified in the event notification subscription.
     *
     * Values: Configuration, Management, Monitoring, Security, Pending
     * @cloudformationAttribute EventCategoriesList
     */
    public readonly attrEventCategoriesList: string[];

    /**
     * A list of the sources that publish events to the Amazon Redshift event notification subscription.
     * @cloudformationAttribute SourceIdsList
     */
    public readonly attrSourceIdsList: string[];

    /**
     * The status of the Amazon Redshift event notification subscription.
     *
     * Constraints:
     *
     * - Can be one of the following: active | no-permission | topic-not-exist
     * - The status "no-permission" indicates that Amazon Redshift no longer has permission to post to the Amazon SNS topic. The status "topic-not-exist" indicates that the topic was deleted after the subscription was created.
     * @cloudformationAttribute Status
     */
    public readonly attrStatus: string;

    /**
     * The date and time the Amazon Redshift event notification subscription was created.
     * @cloudformationAttribute SubscriptionCreationTime
     */
    public readonly attrSubscriptionCreationTime: string;

    /**
     * The name of the event subscription to be created.
     *
     * Constraints:
     *
     * - Cannot be null, empty, or blank.
     * - Must contain from 1 to 255 alphanumeric characters or hyphens.
     * - First character must be a letter.
     * - Cannot end with a hyphen or contain two consecutive hyphens.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-eventsubscription.html#cfn-redshift-eventsubscription-subscriptionname
     */
    public subscriptionName: string;

    /**
     * A boolean value; set to `true` to activate the subscription, and set to `false` to create the subscription but not activate it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-eventsubscription.html#cfn-redshift-eventsubscription-enabled
     */
    public enabled: boolean | cdk.IResolvable | undefined;

    /**
     * Specifies the Amazon Redshift event categories to be published by the event notification subscription.
     *
     * Values: configuration, management, monitoring, security, pending
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-eventsubscription.html#cfn-redshift-eventsubscription-eventcategories
     */
    public eventCategories: string[] | undefined;

    /**
     * Specifies the Amazon Redshift event severity to be published by the event notification subscription.
     *
     * Values: ERROR, INFO
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-eventsubscription.html#cfn-redshift-eventsubscription-severity
     */
    public severity: string | undefined;

    /**
     * The Amazon Resource Name (ARN) of the Amazon SNS topic used to transmit the event notifications. The ARN is created by Amazon SNS when you create a topic and subscribe to it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-eventsubscription.html#cfn-redshift-eventsubscription-snstopicarn
     */
    public snsTopicArn: string | undefined;

    /**
     * A list of one or more identifiers of Amazon Redshift source objects. All of the objects must be of the same type as was specified in the source type parameter. The event subscription will return only events generated by the specified objects. If not specified, then events are returned for all objects within the source type specified.
     *
     * Example: my-cluster-1, my-cluster-2
     *
     * Example: my-snapshot-20131010
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-eventsubscription.html#cfn-redshift-eventsubscription-sourceids
     */
    public sourceIds: string[] | undefined;

    /**
     * The type of source that will be generating the events. For example, if you want to be notified of events generated by a cluster, you would set this parameter to cluster. If this value is not specified, events are returned for all Amazon Redshift objects in your AWS account . You must specify a source type in order to specify source IDs.
     *
     * Valid values: cluster, cluster-parameter-group, cluster-security-group, cluster-snapshot, and scheduled-action.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-eventsubscription.html#cfn-redshift-eventsubscription-sourcetype
     */
    public sourceType: string | undefined;

    /**
     * A list of tag instances.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-eventsubscription.html#cfn-redshift-eventsubscription-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::Redshift::EventSubscription`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnEventSubscriptionProps) {
        super(scope, id, { type: CfnEventSubscription.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'subscriptionName', this);
        this.attrCustSubscriptionId = cdk.Token.asString(this.getAtt('CustSubscriptionId'));
        this.attrCustomerAwsId = cdk.Token.asString(this.getAtt('CustomerAwsId'));
        this.attrEventCategoriesList = cdk.Token.asList(this.getAtt('EventCategoriesList'));
        this.attrSourceIdsList = cdk.Token.asList(this.getAtt('SourceIdsList'));
        this.attrStatus = cdk.Token.asString(this.getAtt('Status'));
        this.attrSubscriptionCreationTime = cdk.Token.asString(this.getAtt('SubscriptionCreationTime'));

        this.subscriptionName = props.subscriptionName;
        this.enabled = props.enabled;
        this.eventCategories = props.eventCategories;
        this.severity = props.severity;
        this.snsTopicArn = props.snsTopicArn;
        this.sourceIds = props.sourceIds;
        this.sourceType = props.sourceType;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::Redshift::EventSubscription", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnEventSubscription.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            subscriptionName: this.subscriptionName,
            enabled: this.enabled,
            eventCategories: this.eventCategories,
            severity: this.severity,
            snsTopicArn: this.snsTopicArn,
            sourceIds: this.sourceIds,
            sourceType: this.sourceType,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnEventSubscriptionPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnScheduledAction`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-scheduledaction.html
 */
export interface CfnScheduledActionProps {

    /**
     * The name of the scheduled action.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-scheduledaction.html#cfn-redshift-scheduledaction-scheduledactionname
     */
    readonly scheduledActionName: string;

    /**
     * If true, the schedule is enabled. If false, the scheduled action does not trigger. For more information about `state` of the scheduled action, see `ScheduledAction` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-scheduledaction.html#cfn-redshift-scheduledaction-enable
     */
    readonly enable?: boolean | cdk.IResolvable;

    /**
     * The end time in UTC when the schedule is no longer active. After this time, the scheduled action does not trigger.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-scheduledaction.html#cfn-redshift-scheduledaction-endtime
     */
    readonly endTime?: string;

    /**
     * The IAM role to assume to run the scheduled action. This IAM role must have permission to run the Amazon Redshift API operation in the scheduled action. This IAM role must allow the Amazon Redshift scheduler (Principal scheduler.redshift.amazonaws.com) to assume permissions on your behalf. For more information about the IAM role to use with the Amazon Redshift scheduler, see [Using Identity-Based Policies for Amazon Redshift](https://docs.aws.amazon.com/redshift/latest/mgmt/redshift-iam-access-control-identity-based.html) in the *Amazon Redshift Cluster Management Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-scheduledaction.html#cfn-redshift-scheduledaction-iamrole
     */
    readonly iamRole?: string;

    /**
     * The schedule for a one-time (at format) or recurring (cron format) scheduled action. Schedule invocations must be separated by at least one hour.
     *
     * Format of at expressions is " `at(yyyy-mm-ddThh:mm:ss)` ". For example, " `at(2016-03-04T17:27:00)` ".
     *
     * Format of cron expressions is " `cron(Minutes Hours Day-of-month Month Day-of-week Year)` ". For example, " `cron(0 10 ? * MON *)` ". For more information, see [Cron Expressions](https://docs.aws.amazon.com//AmazonCloudWatch/latest/events/ScheduledEvents.html#CronExpressions) in the *Amazon CloudWatch Events User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-scheduledaction.html#cfn-redshift-scheduledaction-schedule
     */
    readonly schedule?: string;

    /**
     * The description of the scheduled action.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-scheduledaction.html#cfn-redshift-scheduledaction-scheduledactiondescription
     */
    readonly scheduledActionDescription?: string;

    /**
     * The start time in UTC when the schedule is active. Before this time, the scheduled action does not trigger.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-scheduledaction.html#cfn-redshift-scheduledaction-starttime
     */
    readonly startTime?: string;

    /**
     * A JSON format string of the Amazon Redshift API operation with input parameters.
     *
     * " `{\"ResizeCluster\":{\"NodeType\":\"ds2.8xlarge\",\"ClusterIdentifier\":\"my-test-cluster\",\"NumberOfNodes\":3}}` ".
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-scheduledaction.html#cfn-redshift-scheduledaction-targetaction
     */
    readonly targetAction?: CfnScheduledAction.ScheduledActionTypeProperty | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnScheduledActionProps`
 *
 * @param properties - the TypeScript properties of a `CfnScheduledActionProps`
 *
 * @returns the result of the validation.
 */
function CfnScheduledActionPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('enable', cdk.validateBoolean)(properties.enable));
    errors.collect(cdk.propertyValidator('endTime', cdk.validateString)(properties.endTime));
    errors.collect(cdk.propertyValidator('iamRole', cdk.validateString)(properties.iamRole));
    errors.collect(cdk.propertyValidator('schedule', cdk.validateString)(properties.schedule));
    errors.collect(cdk.propertyValidator('scheduledActionDescription', cdk.validateString)(properties.scheduledActionDescription));
    errors.collect(cdk.propertyValidator('scheduledActionName', cdk.requiredValidator)(properties.scheduledActionName));
    errors.collect(cdk.propertyValidator('scheduledActionName', cdk.validateString)(properties.scheduledActionName));
    errors.collect(cdk.propertyValidator('startTime', cdk.validateString)(properties.startTime));
    errors.collect(cdk.propertyValidator('targetAction', CfnScheduledAction_ScheduledActionTypePropertyValidator)(properties.targetAction));
    return errors.wrap('supplied properties not correct for "CfnScheduledActionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Redshift::ScheduledAction` resource
 *
 * @param properties - the TypeScript properties of a `CfnScheduledActionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Redshift::ScheduledAction` resource.
 */
// @ts-ignore TS6133
function cfnScheduledActionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScheduledActionPropsValidator(properties).assertSuccess();
    return {
        ScheduledActionName: cdk.stringToCloudFormation(properties.scheduledActionName),
        Enable: cdk.booleanToCloudFormation(properties.enable),
        EndTime: cdk.stringToCloudFormation(properties.endTime),
        IamRole: cdk.stringToCloudFormation(properties.iamRole),
        Schedule: cdk.stringToCloudFormation(properties.schedule),
        ScheduledActionDescription: cdk.stringToCloudFormation(properties.scheduledActionDescription),
        StartTime: cdk.stringToCloudFormation(properties.startTime),
        TargetAction: cfnScheduledActionScheduledActionTypePropertyToCloudFormation(properties.targetAction),
    };
}

// @ts-ignore TS6133
function CfnScheduledActionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScheduledActionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScheduledActionProps>();
    ret.addPropertyResult('scheduledActionName', 'ScheduledActionName', cfn_parse.FromCloudFormation.getString(properties.ScheduledActionName));
    ret.addPropertyResult('enable', 'Enable', properties.Enable != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Enable) : undefined);
    ret.addPropertyResult('endTime', 'EndTime', properties.EndTime != null ? cfn_parse.FromCloudFormation.getString(properties.EndTime) : undefined);
    ret.addPropertyResult('iamRole', 'IamRole', properties.IamRole != null ? cfn_parse.FromCloudFormation.getString(properties.IamRole) : undefined);
    ret.addPropertyResult('schedule', 'Schedule', properties.Schedule != null ? cfn_parse.FromCloudFormation.getString(properties.Schedule) : undefined);
    ret.addPropertyResult('scheduledActionDescription', 'ScheduledActionDescription', properties.ScheduledActionDescription != null ? cfn_parse.FromCloudFormation.getString(properties.ScheduledActionDescription) : undefined);
    ret.addPropertyResult('startTime', 'StartTime', properties.StartTime != null ? cfn_parse.FromCloudFormation.getString(properties.StartTime) : undefined);
    ret.addPropertyResult('targetAction', 'TargetAction', properties.TargetAction != null ? CfnScheduledActionScheduledActionTypePropertyFromCloudFormation(properties.TargetAction) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::Redshift::ScheduledAction`
 *
 * Creates a scheduled action. A scheduled action contains a schedule and an Amazon Redshift API action. For example, you can create a schedule of when to run the `ResizeCluster` API operation.
 *
 * @cloudformationResource AWS::Redshift::ScheduledAction
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-scheduledaction.html
 */
export class CfnScheduledAction extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::Redshift::ScheduledAction";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnScheduledAction {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnScheduledActionPropsFromCloudFormation(resourceProperties);
        const ret = new CfnScheduledAction(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * List of times when the scheduled action will run.
     * @cloudformationAttribute NextInvocations
     */
    public readonly attrNextInvocations: string[];

    /**
     * The state of the scheduled action. For example, `DISABLED` .
     * @cloudformationAttribute State
     */
    public readonly attrState: string;

    /**
     * The name of the scheduled action.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-scheduledaction.html#cfn-redshift-scheduledaction-scheduledactionname
     */
    public scheduledActionName: string;

    /**
     * If true, the schedule is enabled. If false, the scheduled action does not trigger. For more information about `state` of the scheduled action, see `ScheduledAction` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-scheduledaction.html#cfn-redshift-scheduledaction-enable
     */
    public enable: boolean | cdk.IResolvable | undefined;

    /**
     * The end time in UTC when the schedule is no longer active. After this time, the scheduled action does not trigger.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-scheduledaction.html#cfn-redshift-scheduledaction-endtime
     */
    public endTime: string | undefined;

    /**
     * The IAM role to assume to run the scheduled action. This IAM role must have permission to run the Amazon Redshift API operation in the scheduled action. This IAM role must allow the Amazon Redshift scheduler (Principal scheduler.redshift.amazonaws.com) to assume permissions on your behalf. For more information about the IAM role to use with the Amazon Redshift scheduler, see [Using Identity-Based Policies for Amazon Redshift](https://docs.aws.amazon.com/redshift/latest/mgmt/redshift-iam-access-control-identity-based.html) in the *Amazon Redshift Cluster Management Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-scheduledaction.html#cfn-redshift-scheduledaction-iamrole
     */
    public iamRole: string | undefined;

    /**
     * The schedule for a one-time (at format) or recurring (cron format) scheduled action. Schedule invocations must be separated by at least one hour.
     *
     * Format of at expressions is " `at(yyyy-mm-ddThh:mm:ss)` ". For example, " `at(2016-03-04T17:27:00)` ".
     *
     * Format of cron expressions is " `cron(Minutes Hours Day-of-month Month Day-of-week Year)` ". For example, " `cron(0 10 ? * MON *)` ". For more information, see [Cron Expressions](https://docs.aws.amazon.com//AmazonCloudWatch/latest/events/ScheduledEvents.html#CronExpressions) in the *Amazon CloudWatch Events User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-scheduledaction.html#cfn-redshift-scheduledaction-schedule
     */
    public schedule: string | undefined;

    /**
     * The description of the scheduled action.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-scheduledaction.html#cfn-redshift-scheduledaction-scheduledactiondescription
     */
    public scheduledActionDescription: string | undefined;

    /**
     * The start time in UTC when the schedule is active. Before this time, the scheduled action does not trigger.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-scheduledaction.html#cfn-redshift-scheduledaction-starttime
     */
    public startTime: string | undefined;

    /**
     * A JSON format string of the Amazon Redshift API operation with input parameters.
     *
     * " `{\"ResizeCluster\":{\"NodeType\":\"ds2.8xlarge\",\"ClusterIdentifier\":\"my-test-cluster\",\"NumberOfNodes\":3}}` ".
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-redshift-scheduledaction.html#cfn-redshift-scheduledaction-targetaction
     */
    public targetAction: CfnScheduledAction.ScheduledActionTypeProperty | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::Redshift::ScheduledAction`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnScheduledActionProps) {
        super(scope, id, { type: CfnScheduledAction.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'scheduledActionName', this);
        this.attrNextInvocations = cdk.Token.asList(this.getAtt('NextInvocations'));
        this.attrState = cdk.Token.asString(this.getAtt('State'));

        this.scheduledActionName = props.scheduledActionName;
        this.enable = props.enable;
        this.endTime = props.endTime;
        this.iamRole = props.iamRole;
        this.schedule = props.schedule;
        this.scheduledActionDescription = props.scheduledActionDescription;
        this.startTime = props.startTime;
        this.targetAction = props.targetAction;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnScheduledAction.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            scheduledActionName: this.scheduledActionName,
            enable: this.enable,
            endTime: this.endTime,
            iamRole: this.iamRole,
            schedule: this.schedule,
            scheduledActionDescription: this.scheduledActionDescription,
            startTime: this.startTime,
            targetAction: this.targetAction,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnScheduledActionPropsToCloudFormation(props);
    }
}

export namespace CfnScheduledAction {
    /**
     * Describes a pause cluster operation. For example, a scheduled action to run the `PauseCluster` API operation.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-scheduledaction-pauseclustermessage.html
     */
    export interface PauseClusterMessageProperty {
        /**
         * The identifier of the cluster to be paused.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-scheduledaction-pauseclustermessage.html#cfn-redshift-scheduledaction-pauseclustermessage-clusteridentifier
         */
        readonly clusterIdentifier: string;
    }
}

/**
 * Determine whether the given properties match those of a `PauseClusterMessageProperty`
 *
 * @param properties - the TypeScript properties of a `PauseClusterMessageProperty`
 *
 * @returns the result of the validation.
 */
function CfnScheduledAction_PauseClusterMessagePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('clusterIdentifier', cdk.requiredValidator)(properties.clusterIdentifier));
    errors.collect(cdk.propertyValidator('clusterIdentifier', cdk.validateString)(properties.clusterIdentifier));
    return errors.wrap('supplied properties not correct for "PauseClusterMessageProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Redshift::ScheduledAction.PauseClusterMessage` resource
 *
 * @param properties - the TypeScript properties of a `PauseClusterMessageProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Redshift::ScheduledAction.PauseClusterMessage` resource.
 */
// @ts-ignore TS6133
function cfnScheduledActionPauseClusterMessagePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScheduledAction_PauseClusterMessagePropertyValidator(properties).assertSuccess();
    return {
        ClusterIdentifier: cdk.stringToCloudFormation(properties.clusterIdentifier),
    };
}

// @ts-ignore TS6133
function CfnScheduledActionPauseClusterMessagePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScheduledAction.PauseClusterMessageProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScheduledAction.PauseClusterMessageProperty>();
    ret.addPropertyResult('clusterIdentifier', 'ClusterIdentifier', cfn_parse.FromCloudFormation.getString(properties.ClusterIdentifier));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScheduledAction {
    /**
     * Describes a resize cluster operation. For example, a scheduled action to run the `ResizeCluster` API operation.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-scheduledaction-resizeclustermessage.html
     */
    export interface ResizeClusterMessageProperty {
        /**
         * A boolean value indicating whether the resize operation is using the classic resize process. If you don't provide this parameter or set the value to `false` , the resize type is elastic.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-scheduledaction-resizeclustermessage.html#cfn-redshift-scheduledaction-resizeclustermessage-classic
         */
        readonly classic?: boolean | cdk.IResolvable;
        /**
         * The unique identifier for the cluster to resize.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-scheduledaction-resizeclustermessage.html#cfn-redshift-scheduledaction-resizeclustermessage-clusteridentifier
         */
        readonly clusterIdentifier: string;
        /**
         * The new cluster type for the specified cluster.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-scheduledaction-resizeclustermessage.html#cfn-redshift-scheduledaction-resizeclustermessage-clustertype
         */
        readonly clusterType?: string;
        /**
         * The new node type for the nodes you are adding. If not specified, the cluster's current node type is used.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-scheduledaction-resizeclustermessage.html#cfn-redshift-scheduledaction-resizeclustermessage-nodetype
         */
        readonly nodeType?: string;
        /**
         * The new number of nodes for the cluster. If not specified, the cluster's current number of nodes is used.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-scheduledaction-resizeclustermessage.html#cfn-redshift-scheduledaction-resizeclustermessage-numberofnodes
         */
        readonly numberOfNodes?: number;
    }
}

/**
 * Determine whether the given properties match those of a `ResizeClusterMessageProperty`
 *
 * @param properties - the TypeScript properties of a `ResizeClusterMessageProperty`
 *
 * @returns the result of the validation.
 */
function CfnScheduledAction_ResizeClusterMessagePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('classic', cdk.validateBoolean)(properties.classic));
    errors.collect(cdk.propertyValidator('clusterIdentifier', cdk.requiredValidator)(properties.clusterIdentifier));
    errors.collect(cdk.propertyValidator('clusterIdentifier', cdk.validateString)(properties.clusterIdentifier));
    errors.collect(cdk.propertyValidator('clusterType', cdk.validateString)(properties.clusterType));
    errors.collect(cdk.propertyValidator('nodeType', cdk.validateString)(properties.nodeType));
    errors.collect(cdk.propertyValidator('numberOfNodes', cdk.validateNumber)(properties.numberOfNodes));
    return errors.wrap('supplied properties not correct for "ResizeClusterMessageProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Redshift::ScheduledAction.ResizeClusterMessage` resource
 *
 * @param properties - the TypeScript properties of a `ResizeClusterMessageProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Redshift::ScheduledAction.ResizeClusterMessage` resource.
 */
// @ts-ignore TS6133
function cfnScheduledActionResizeClusterMessagePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScheduledAction_ResizeClusterMessagePropertyValidator(properties).assertSuccess();
    return {
        Classic: cdk.booleanToCloudFormation(properties.classic),
        ClusterIdentifier: cdk.stringToCloudFormation(properties.clusterIdentifier),
        ClusterType: cdk.stringToCloudFormation(properties.clusterType),
        NodeType: cdk.stringToCloudFormation(properties.nodeType),
        NumberOfNodes: cdk.numberToCloudFormation(properties.numberOfNodes),
    };
}

// @ts-ignore TS6133
function CfnScheduledActionResizeClusterMessagePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScheduledAction.ResizeClusterMessageProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScheduledAction.ResizeClusterMessageProperty>();
    ret.addPropertyResult('classic', 'Classic', properties.Classic != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Classic) : undefined);
    ret.addPropertyResult('clusterIdentifier', 'ClusterIdentifier', cfn_parse.FromCloudFormation.getString(properties.ClusterIdentifier));
    ret.addPropertyResult('clusterType', 'ClusterType', properties.ClusterType != null ? cfn_parse.FromCloudFormation.getString(properties.ClusterType) : undefined);
    ret.addPropertyResult('nodeType', 'NodeType', properties.NodeType != null ? cfn_parse.FromCloudFormation.getString(properties.NodeType) : undefined);
    ret.addPropertyResult('numberOfNodes', 'NumberOfNodes', properties.NumberOfNodes != null ? cfn_parse.FromCloudFormation.getNumber(properties.NumberOfNodes) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScheduledAction {
    /**
     * Describes a resume cluster operation. For example, a scheduled action to run the `ResumeCluster` API operation.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-scheduledaction-resumeclustermessage.html
     */
    export interface ResumeClusterMessageProperty {
        /**
         * The identifier of the cluster to be resumed.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-scheduledaction-resumeclustermessage.html#cfn-redshift-scheduledaction-resumeclustermessage-clusteridentifier
         */
        readonly clusterIdentifier: string;
    }
}

/**
 * Determine whether the given properties match those of a `ResumeClusterMessageProperty`
 *
 * @param properties - the TypeScript properties of a `ResumeClusterMessageProperty`
 *
 * @returns the result of the validation.
 */
function CfnScheduledAction_ResumeClusterMessagePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('clusterIdentifier', cdk.requiredValidator)(properties.clusterIdentifier));
    errors.collect(cdk.propertyValidator('clusterIdentifier', cdk.validateString)(properties.clusterIdentifier));
    return errors.wrap('supplied properties not correct for "ResumeClusterMessageProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Redshift::ScheduledAction.ResumeClusterMessage` resource
 *
 * @param properties - the TypeScript properties of a `ResumeClusterMessageProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Redshift::ScheduledAction.ResumeClusterMessage` resource.
 */
// @ts-ignore TS6133
function cfnScheduledActionResumeClusterMessagePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScheduledAction_ResumeClusterMessagePropertyValidator(properties).assertSuccess();
    return {
        ClusterIdentifier: cdk.stringToCloudFormation(properties.clusterIdentifier),
    };
}

// @ts-ignore TS6133
function CfnScheduledActionResumeClusterMessagePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScheduledAction.ResumeClusterMessageProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScheduledAction.ResumeClusterMessageProperty>();
    ret.addPropertyResult('clusterIdentifier', 'ClusterIdentifier', cfn_parse.FromCloudFormation.getString(properties.ClusterIdentifier));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnScheduledAction {
    /**
     * The action type that specifies an Amazon Redshift API operation that is supported by the Amazon Redshift scheduler.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-scheduledaction-scheduledactiontype.html
     */
    export interface ScheduledActionTypeProperty {
        /**
         * An action that runs a `PauseCluster` API operation.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-scheduledaction-scheduledactiontype.html#cfn-redshift-scheduledaction-scheduledactiontype-pausecluster
         */
        readonly pauseCluster?: CfnScheduledAction.PauseClusterMessageProperty | cdk.IResolvable;
        /**
         * An action that runs a `ResizeCluster` API operation.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-scheduledaction-scheduledactiontype.html#cfn-redshift-scheduledaction-scheduledactiontype-resizecluster
         */
        readonly resizeCluster?: CfnScheduledAction.ResizeClusterMessageProperty | cdk.IResolvable;
        /**
         * An action that runs a `ResumeCluster` API operation.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-redshift-scheduledaction-scheduledactiontype.html#cfn-redshift-scheduledaction-scheduledactiontype-resumecluster
         */
        readonly resumeCluster?: CfnScheduledAction.ResumeClusterMessageProperty | cdk.IResolvable;
    }
}

/**
 * Determine whether the given properties match those of a `ScheduledActionTypeProperty`
 *
 * @param properties - the TypeScript properties of a `ScheduledActionTypeProperty`
 *
 * @returns the result of the validation.
 */
function CfnScheduledAction_ScheduledActionTypePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('pauseCluster', CfnScheduledAction_PauseClusterMessagePropertyValidator)(properties.pauseCluster));
    errors.collect(cdk.propertyValidator('resizeCluster', CfnScheduledAction_ResizeClusterMessagePropertyValidator)(properties.resizeCluster));
    errors.collect(cdk.propertyValidator('resumeCluster', CfnScheduledAction_ResumeClusterMessagePropertyValidator)(properties.resumeCluster));
    return errors.wrap('supplied properties not correct for "ScheduledActionTypeProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::Redshift::ScheduledAction.ScheduledActionType` resource
 *
 * @param properties - the TypeScript properties of a `ScheduledActionTypeProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::Redshift::ScheduledAction.ScheduledActionType` resource.
 */
// @ts-ignore TS6133
function cfnScheduledActionScheduledActionTypePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnScheduledAction_ScheduledActionTypePropertyValidator(properties).assertSuccess();
    return {
        PauseCluster: cfnScheduledActionPauseClusterMessagePropertyToCloudFormation(properties.pauseCluster),
        ResizeCluster: cfnScheduledActionResizeClusterMessagePropertyToCloudFormation(properties.resizeCluster),
        ResumeCluster: cfnScheduledActionResumeClusterMessagePropertyToCloudFormation(properties.resumeCluster),
    };
}

// @ts-ignore TS6133
function CfnScheduledActionScheduledActionTypePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnScheduledAction.ScheduledActionTypeProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnScheduledAction.ScheduledActionTypeProperty>();
    ret.addPropertyResult('pauseCluster', 'PauseCluster', properties.PauseCluster != null ? CfnScheduledActionPauseClusterMessagePropertyFromCloudFormation(properties.PauseCluster) : undefined);
    ret.addPropertyResult('resizeCluster', 'ResizeCluster', properties.ResizeCluster != null ? CfnScheduledActionResizeClusterMessagePropertyFromCloudFormation(properties.ResizeCluster) : undefined);
    ret.addPropertyResult('resumeCluster', 'ResumeCluster', properties.ResumeCluster != null ? CfnScheduledActionResumeClusterMessagePropertyFromCloudFormation(properties.ResumeCluster) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
