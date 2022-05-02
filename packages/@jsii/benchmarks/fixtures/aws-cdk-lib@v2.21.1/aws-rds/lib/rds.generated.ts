// Copyright 2012-2022 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// Generated from the AWS CloudFormation Resource Specification
// See: docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-resource-specification.html
// @cfn2ts:meta@ {"generated":"2022-04-30T00:14:26.067Z","fingerprint":"jqwvAc1/u+Yf4741FS6ZLEA4ijdNe4RJcHbyFnEPv6U="}

/* eslint-disable max-len */ // This is generated code - line lengths are difficult to control

import * as constructs from 'constructs';
import * as cdk from '../../core';
import * as cfn_parse from '../../core/lib/helpers-internal';

/**
 * Properties for defining a `CfnDBCluster`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html
 */
export interface CfnDBClusterProps {

    /**
     * The name of the database engine to be used for this DB cluster.
     *
     * Valid Values: `aurora` (for MySQL 5.6-compatible Aurora), `aurora-mysql` (for MySQL 5.7-compatible Aurora), and `aurora-postgresql`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-engine
     */
    readonly engine: string;

    /**
     * Provides a list of the AWS Identity and Access Management (IAM) roles that are associated with the DB cluster. IAM roles that are associated with a DB cluster grant permission for the DB cluster to access other Amazon Web Services on your behalf.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-associatedroles
     */
    readonly associatedRoles?: Array<CfnDBCluster.DBClusterRoleProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * A list of Availability Zones (AZs) where instances in the DB cluster can be created. For information on AWS Regions and Availability Zones, see [Choosing the Regions and Availability Zones](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.RegionsAndAvailabilityZones.html) in the *Amazon Aurora User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-availabilityzones
     */
    readonly availabilityZones?: string[];

    /**
     * The target backtrack window, in seconds. To disable backtracking, set this value to 0.
     *
     * > Currently, Backtrack is only supported for Aurora MySQL DB clusters.
     *
     * Default: 0
     *
     * Constraints:
     *
     * - If specified, this value must be set to a number from 0 to 259,200 (72 hours).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-backtrackwindow
     */
    readonly backtrackWindow?: number;

    /**
     * The number of days for which automated backups are retained.
     *
     * Default: 1
     *
     * Constraints:
     *
     * - Must be a value from 1 to 35
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-backuprententionperiod
     */
    readonly backupRetentionPeriod?: number;

    /**
     * A value that indicates whether to copy all tags from the DB cluster to snapshots of the DB cluster. The default is not to copy them.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-copytagstosnapshot
     */
    readonly copyTagsToSnapshot?: boolean | cdk.IResolvable;

    /**
     * The name of your database. If you don't provide a name, then Amazon RDS won't create a database in this DB cluster. For naming constraints, see [Naming Constraints](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_Limits.html#RDS_Limits.Constraints) in the *Amazon Aurora User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-databasename
     */
    readonly databaseName?: string;

    /**
     * The DB cluster identifier. This parameter is stored as a lowercase string.
     *
     * Constraints:
     *
     * - Must contain from 1 to 63 letters, numbers, or hyphens.
     * - First character must be a letter.
     * - Can't end with a hyphen or contain two consecutive hyphens.
     *
     * Example: `my-cluster1`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-dbclusteridentifier
     */
    readonly dbClusterIdentifier?: string;

    /**
     * The name of the DB cluster parameter group to associate with this DB cluster.
     *
     * > If you apply a parameter group to an existing DB cluster, then its DB instances might need to reboot. This can result in an outage while the DB instances are rebooting.
     * >
     * > If you apply a change to parameter group associated with a stopped DB cluster, then the update stack waits until the DB cluster is started.
     *
     * To list all of the available DB cluster parameter group names, use the following command:
     *
     * `aws rds describe-db-cluster-parameter-groups --query "DBClusterParameterGroups[].DBClusterParameterGroupName" --output text`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-dbclusterparametergroupname
     */
    readonly dbClusterParameterGroupName?: string;

    /**
     * A DB subnet group that you want to associate with this DB cluster.
     *
     * If you are restoring a DB cluster to a point in time with `RestoreType` set to `copy-on-write` , and don't specify a DB subnet group name, then the DB cluster is restored with a default DB subnet group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-dbsubnetgroupname
     */
    readonly dbSubnetGroupName?: string;

    /**
     * A value that indicates whether the DB cluster has deletion protection enabled. The database can't be deleted when deletion protection is enabled. By default, deletion protection is disabled.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-deletionprotection
     */
    readonly deletionProtection?: boolean | cdk.IResolvable;

    /**
     * The list of log types that need to be enabled for exporting to CloudWatch Logs. The values in the list depend on the DB engine being used. For more information, see [Publishing Database Logs to Amazon CloudWatch Logs](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_LogAccess.html#USER_LogAccess.Procedural.UploadtoCloudWatch) in the *Amazon Aurora User Guide* .
     *
     * *Aurora MySQL*
     *
     * Valid values: `audit` , `error` , `general` , `slowquery`
     *
     * *Aurora PostgreSQL*
     *
     * Valid values: `postgresql`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-enablecloudwatchlogsexports
     */
    readonly enableCloudwatchLogsExports?: string[];

    /**
     * A value that indicates whether to enable the HTTP endpoint for an Aurora Serverless DB cluster. By default, the HTTP endpoint is disabled.
     *
     * When enabled, the HTTP endpoint provides a connectionless web service API for running SQL queries on the Aurora Serverless DB cluster. You can also query your database from inside the RDS console with the query editor.
     *
     * For more information, see [Using the Data API for Aurora Serverless](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/data-api.html) in the *Amazon Aurora User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-enablehttpendpoint
     */
    readonly enableHttpEndpoint?: boolean | cdk.IResolvable;

    /**
     * A value that indicates whether to enable mapping of AWS Identity and Access Management (IAM) accounts to database accounts. By default, mapping is disabled.
     *
     * For more information, see [IAM Database Authentication](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.html) in the *Amazon Aurora User Guide.*
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-enableiamdatabaseauthentication
     */
    readonly enableIamDatabaseAuthentication?: boolean | cdk.IResolvable;

    /**
     * The DB engine mode of the DB cluster, either `provisioned` , `serverless` , `parallelquery` , `global` , or `multimaster` .
     *
     * The `parallelquery` engine mode isn't required for Aurora MySQL version 1.23 and higher 1.x versions, and version 2.09 and higher 2.x versions.
     *
     * The `global` engine mode isn't required for Aurora MySQL version 1.22 and higher 1.x versions, and `global` engine mode isn't required for any 2.x versions.
     *
     * The `multimaster` engine mode only applies for DB clusters created with Aurora MySQL version 5.6.10a.
     *
     * For Aurora PostgreSQL, the `global` engine mode isn't required, and both the `parallelquery` and the `multimaster` engine modes currently aren't supported.
     *
     * Limitations and requirements apply to some DB engine modes. For more information, see the following sections in the *Amazon Aurora User Guide* :
     *
     * - [Limitations of Aurora Serverless](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless.html#aurora-serverless.limitations)
     * - [Limitations of Parallel Query](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-mysql-parallel-query.html#aurora-mysql-parallel-query-limitations)
     * - [Limitations of Aurora Global Databases](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html#aurora-global-database.limitations)
     * - [Limitations of Multi-Master Clusters](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-multi-master.html#aurora-multi-master-limitations)
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-enginemode
     */
    readonly engineMode?: string;

    /**
     * The version number of the database engine to use.
     *
     * To list all of the available engine versions for `aurora` (for MySQL 5.6-compatible Aurora), use the following command:
     *
     * `aws rds describe-db-engine-versions --engine aurora --query "DBEngineVersions[].EngineVersion"`
     *
     * To list all of the available engine versions for `aurora-mysql` (for MySQL 5.7-compatible Aurora), use the following command:
     *
     * `aws rds describe-db-engine-versions --engine aurora-mysql --query "DBEngineVersions[].EngineVersion"`
     *
     * To list all of the available engine versions for `aurora-postgresql` , use the following command:
     *
     * `aws rds describe-db-engine-versions --engine aurora-postgresql --query "DBEngineVersions[].EngineVersion"`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-engineversion
     */
    readonly engineVersion?: string;

    /**
     * If you are configuring an Aurora global database cluster and want your Aurora DB cluster to be a secondary member in the global database cluster, specify the global cluster ID of the global database cluster. To define the primary database cluster of the global cluster, use the [AWS::RDS::GlobalCluster](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html) resource.
     *
     * If you aren't configuring a global database cluster, don't specify this property.
     *
     * > To remove the DB cluster from a global database cluster, specify an empty value for the `GlobalClusterIdentifier` property.
     *
     * For information about Aurora global databases, see [Working with Amazon Aurora Global Databases](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html) in the *Amazon Aurora User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-globalclusteridentifier
     */
    readonly globalClusterIdentifier?: string;

    /**
     * The Amazon Resource Name (ARN) of the AWS KMS key that is used to encrypt the database instances in the DB cluster, such as `arn:aws:kms:us-east-1:012345678910:key/abcd1234-a123-456a-a12b-a123b4cd56ef` . If you enable the `StorageEncrypted` property but don't specify this property, the default KMS key is used. If you specify this property, you must set the `StorageEncrypted` property to `true` .
     *
     * If you specify the `SnapshotIdentifier` property, the `StorageEncrypted` property value is inherited from the snapshot, and if the DB cluster is encrypted, the specified `KmsKeyId` property is used.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-kmskeyid
     */
    readonly kmsKeyId?: string;

    /**
     * The name of the master user for the DB cluster.
     *
     * > If you specify the `SourceDBClusterIdentifier` , `SnapshotIdentifier` , or `GlobalClusterIdentifier` property, don't specify this property. The value is inherited from the source DB cluster, the snapshot, or the primary DB cluster for the global database cluster, respectively.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-masterusername
     */
    readonly masterUsername?: string;

    /**
     * The master password for the DB instance.
     *
     * > If you specify the `SourceDBClusterIdentifier` , `SnapshotIdentifier` , or `GlobalClusterIdentifier` property, don't specify this property. The value is inherited from the source DB cluster, the snapshot, or the primary DB cluster for the global database cluster, respectively.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-masteruserpassword
     */
    readonly masterUserPassword?: string;

    /**
     * The port number on which the DB instances in the DB cluster accept connections.
     *
     * Default:
     *
     * - When `EngineMode` is `provisioned` , `3306` (for both Aurora MySQL and Aurora PostgreSQL)
     * - When `EngineMode` is `serverless` :
     *
     * - `3306` when `Engine` is `aurora` or `aurora-mysql`
     * - `5432` when `Engine` is `aurora-postgresql`
     *
     * > The `No interruption` on update behavior only applies to DB clusters. If you are updating a DB instance, see [Port](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-port) for the AWS::RDS::DBInstance resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-port
     */
    readonly port?: number;

    /**
     * The daily time range during which automated backups are created. For more information, see [Backup Window](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Backups.html#Aurora.Managing.Backups.BackupWindow) in the *Amazon Aurora User Guide.*
     *
     * Constraints:
     *
     * - Must be in the format `hh24:mi-hh24:mi` .
     * - Must be in Universal Coordinated Time (UTC).
     * - Must not conflict with the preferred maintenance window.
     * - Must be at least 30 minutes.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-preferredbackupwindow
     */
    readonly preferredBackupWindow?: string;

    /**
     * The weekly time range during which system maintenance can occur, in Universal Coordinated Time (UTC).
     *
     * Format: `ddd:hh24:mi-ddd:hh24:mi`
     *
     * The default is a 30-minute window selected at random from an 8-hour block of time for each AWS Region, occurring on a random day of the week. To see the time blocks available, see [Adjusting the Preferred DB Cluster Maintenance Window](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_UpgradeDBInstance.Maintenance.html#AdjustingTheMaintenanceWindow.Aurora) in the *Amazon Aurora User Guide.*
     *
     * Valid Days: Mon, Tue, Wed, Thu, Fri, Sat, Sun.
     *
     * Constraints: Minimum 30-minute window.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-preferredmaintenancewindow
     */
    readonly preferredMaintenanceWindow?: string;

    /**
     * The Amazon Resource Name (ARN) of the source DB instance or DB cluster if this DB cluster is created as a read replica.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-replicationsourceidentifier
     */
    readonly replicationSourceIdentifier?: string;

    /**
     * The type of restore to be performed. You can specify one of the following values:
     *
     * - `full-copy` - The new DB cluster is restored as a full copy of the source DB cluster.
     * - `copy-on-write` - The new DB cluster is restored as a clone of the source DB cluster.
     *
     * Constraints: You can't specify `copy-on-write` if the engine version of the source DB cluster is earlier than 1.11.
     *
     * If you don't specify a `RestoreType` value, then the new DB cluster is restored as a full copy of the source DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-restoretype
     */
    readonly restoreType?: string;

    /**
     * The `ScalingConfiguration` property type specifies the scaling configuration of an Aurora Serverless DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-scalingconfiguration
     */
    readonly scalingConfiguration?: CfnDBCluster.ScalingConfigurationProperty | cdk.IResolvable;

    /**
     * The identifier for the DB snapshot or DB cluster snapshot to restore from.
     *
     * You can use either the name or the Amazon Resource Name (ARN) to specify a DB cluster snapshot. However, you can use only the ARN to specify a DB snapshot.
     *
     * After you restore a DB cluster with a `SnapshotIdentifier` property, you must specify the same `SnapshotIdentifier` property for any future updates to the DB cluster. When you specify this property for an update, the DB cluster is not restored from the snapshot again, and the data in the database is not changed. However, if you don't specify the `SnapshotIdentifier` property, an empty DB cluster is created, and the original DB cluster is deleted. If you specify a property that is different from the previous snapshot restore property, a new DB cluster is restored from the specified `SnapshotIdentifier` property, and the original DB cluster is deleted.
     *
     * If you specify the `SnapshotIdentifier` property to restore a DB cluster (as opposed to specifying it for DB cluster updates), then don't specify the following properties:
     *
     * - `GlobalClusterIdentifier`
     * - `MasterUsername`
     * - `ReplicationSourceIdentifier`
     * - `RestoreType`
     * - `SourceDBClusterIdentifier`
     * - `SourceRegion`
     * - `StorageEncrypted`
     * - `UseLatestRestorableTime`
     *
     * Constraints:
     *
     * - Must match the identifier of an existing Snapshot.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-snapshotidentifier
     */
    readonly snapshotIdentifier?: string;

    /**
     * When restoring a DB cluster to a point in time, the identifier of the source DB cluster from which to restore.
     *
     * Constraints:
     *
     * - Must match the identifier of an existing DBCluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-sourcedbclusteridentifier
     */
    readonly sourceDbClusterIdentifier?: string;

    /**
     * The AWS Region which contains the source DB cluster when replicating a DB cluster. For example, `us-east-1` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-sourceregion
     */
    readonly sourceRegion?: string;

    /**
     * Indicates whether the DB cluster is encrypted.
     *
     * If you specify the `KmsKeyId` property, then you must enable encryption.
     *
     * If you specify the `SnapshotIdentifier` or `SourceDBClusterIdentifier` property, don't specify this property. The value is inherited from the snapshot or source DB cluster, and if the DB cluster is encrypted, the specified `KmsKeyId` property is used.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-storageencrypted
     */
    readonly storageEncrypted?: boolean | cdk.IResolvable;

    /**
     * Tags to assign to the DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * A value that indicates whether to restore the DB cluster to the latest restorable backup time. By default, the DB cluster is not restored to the latest restorable backup time.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-uselatestrestorabletime
     */
    readonly useLatestRestorableTime?: boolean | cdk.IResolvable;

    /**
     * A list of EC2 VPC security groups to associate with this DB cluster.
     *
     * If you plan to update the resource, don't specify VPC security groups in a shared VPC.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-vpcsecuritygroupids
     */
    readonly vpcSecurityGroupIds?: string[];
}

/**
 * Determine whether the given properties match those of a `CfnDBClusterProps`
 *
 * @param properties - the TypeScript properties of a `CfnDBClusterProps`
 *
 * @returns the result of the validation.
 */
function CfnDBClusterPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('associatedRoles', cdk.listValidator(CfnDBCluster_DBClusterRolePropertyValidator))(properties.associatedRoles));
    errors.collect(cdk.propertyValidator('availabilityZones', cdk.listValidator(cdk.validateString))(properties.availabilityZones));
    errors.collect(cdk.propertyValidator('backtrackWindow', cdk.validateNumber)(properties.backtrackWindow));
    errors.collect(cdk.propertyValidator('backupRetentionPeriod', cdk.validateNumber)(properties.backupRetentionPeriod));
    errors.collect(cdk.propertyValidator('copyTagsToSnapshot', cdk.validateBoolean)(properties.copyTagsToSnapshot));
    errors.collect(cdk.propertyValidator('dbClusterIdentifier', cdk.validateString)(properties.dbClusterIdentifier));
    errors.collect(cdk.propertyValidator('dbClusterParameterGroupName', cdk.validateString)(properties.dbClusterParameterGroupName));
    errors.collect(cdk.propertyValidator('dbSubnetGroupName', cdk.validateString)(properties.dbSubnetGroupName));
    errors.collect(cdk.propertyValidator('databaseName', cdk.validateString)(properties.databaseName));
    errors.collect(cdk.propertyValidator('deletionProtection', cdk.validateBoolean)(properties.deletionProtection));
    errors.collect(cdk.propertyValidator('enableCloudwatchLogsExports', cdk.listValidator(cdk.validateString))(properties.enableCloudwatchLogsExports));
    errors.collect(cdk.propertyValidator('enableHttpEndpoint', cdk.validateBoolean)(properties.enableHttpEndpoint));
    errors.collect(cdk.propertyValidator('enableIamDatabaseAuthentication', cdk.validateBoolean)(properties.enableIamDatabaseAuthentication));
    errors.collect(cdk.propertyValidator('engine', cdk.requiredValidator)(properties.engine));
    errors.collect(cdk.propertyValidator('engine', cdk.validateString)(properties.engine));
    errors.collect(cdk.propertyValidator('engineMode', cdk.validateString)(properties.engineMode));
    errors.collect(cdk.propertyValidator('engineVersion', cdk.validateString)(properties.engineVersion));
    errors.collect(cdk.propertyValidator('globalClusterIdentifier', cdk.validateString)(properties.globalClusterIdentifier));
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    errors.collect(cdk.propertyValidator('masterUserPassword', cdk.validateString)(properties.masterUserPassword));
    errors.collect(cdk.propertyValidator('masterUsername', cdk.validateString)(properties.masterUsername));
    errors.collect(cdk.propertyValidator('port', cdk.validateNumber)(properties.port));
    errors.collect(cdk.propertyValidator('preferredBackupWindow', cdk.validateString)(properties.preferredBackupWindow));
    errors.collect(cdk.propertyValidator('preferredMaintenanceWindow', cdk.validateString)(properties.preferredMaintenanceWindow));
    errors.collect(cdk.propertyValidator('replicationSourceIdentifier', cdk.validateString)(properties.replicationSourceIdentifier));
    errors.collect(cdk.propertyValidator('restoreType', cdk.validateString)(properties.restoreType));
    errors.collect(cdk.propertyValidator('scalingConfiguration', CfnDBCluster_ScalingConfigurationPropertyValidator)(properties.scalingConfiguration));
    errors.collect(cdk.propertyValidator('snapshotIdentifier', cdk.validateString)(properties.snapshotIdentifier));
    errors.collect(cdk.propertyValidator('sourceDbClusterIdentifier', cdk.validateString)(properties.sourceDbClusterIdentifier));
    errors.collect(cdk.propertyValidator('sourceRegion', cdk.validateString)(properties.sourceRegion));
    errors.collect(cdk.propertyValidator('storageEncrypted', cdk.validateBoolean)(properties.storageEncrypted));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('useLatestRestorableTime', cdk.validateBoolean)(properties.useLatestRestorableTime));
    errors.collect(cdk.propertyValidator('vpcSecurityGroupIds', cdk.listValidator(cdk.validateString))(properties.vpcSecurityGroupIds));
    return errors.wrap('supplied properties not correct for "CfnDBClusterProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::DBCluster` resource
 *
 * @param properties - the TypeScript properties of a `CfnDBClusterProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::DBCluster` resource.
 */
// @ts-ignore TS6133
function cfnDBClusterPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDBClusterPropsValidator(properties).assertSuccess();
    return {
        Engine: cdk.stringToCloudFormation(properties.engine),
        AssociatedRoles: cdk.listMapper(cfnDBClusterDBClusterRolePropertyToCloudFormation)(properties.associatedRoles),
        AvailabilityZones: cdk.listMapper(cdk.stringToCloudFormation)(properties.availabilityZones),
        BacktrackWindow: cdk.numberToCloudFormation(properties.backtrackWindow),
        BackupRetentionPeriod: cdk.numberToCloudFormation(properties.backupRetentionPeriod),
        CopyTagsToSnapshot: cdk.booleanToCloudFormation(properties.copyTagsToSnapshot),
        DatabaseName: cdk.stringToCloudFormation(properties.databaseName),
        DBClusterIdentifier: cdk.stringToCloudFormation(properties.dbClusterIdentifier),
        DBClusterParameterGroupName: cdk.stringToCloudFormation(properties.dbClusterParameterGroupName),
        DBSubnetGroupName: cdk.stringToCloudFormation(properties.dbSubnetGroupName),
        DeletionProtection: cdk.booleanToCloudFormation(properties.deletionProtection),
        EnableCloudwatchLogsExports: cdk.listMapper(cdk.stringToCloudFormation)(properties.enableCloudwatchLogsExports),
        EnableHttpEndpoint: cdk.booleanToCloudFormation(properties.enableHttpEndpoint),
        EnableIAMDatabaseAuthentication: cdk.booleanToCloudFormation(properties.enableIamDatabaseAuthentication),
        EngineMode: cdk.stringToCloudFormation(properties.engineMode),
        EngineVersion: cdk.stringToCloudFormation(properties.engineVersion),
        GlobalClusterIdentifier: cdk.stringToCloudFormation(properties.globalClusterIdentifier),
        KmsKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
        MasterUsername: cdk.stringToCloudFormation(properties.masterUsername),
        MasterUserPassword: cdk.stringToCloudFormation(properties.masterUserPassword),
        Port: cdk.numberToCloudFormation(properties.port),
        PreferredBackupWindow: cdk.stringToCloudFormation(properties.preferredBackupWindow),
        PreferredMaintenanceWindow: cdk.stringToCloudFormation(properties.preferredMaintenanceWindow),
        ReplicationSourceIdentifier: cdk.stringToCloudFormation(properties.replicationSourceIdentifier),
        RestoreType: cdk.stringToCloudFormation(properties.restoreType),
        ScalingConfiguration: cfnDBClusterScalingConfigurationPropertyToCloudFormation(properties.scalingConfiguration),
        SnapshotIdentifier: cdk.stringToCloudFormation(properties.snapshotIdentifier),
        SourceDBClusterIdentifier: cdk.stringToCloudFormation(properties.sourceDbClusterIdentifier),
        SourceRegion: cdk.stringToCloudFormation(properties.sourceRegion),
        StorageEncrypted: cdk.booleanToCloudFormation(properties.storageEncrypted),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        UseLatestRestorableTime: cdk.booleanToCloudFormation(properties.useLatestRestorableTime),
        VpcSecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.vpcSecurityGroupIds),
    };
}

// @ts-ignore TS6133
function CfnDBClusterPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDBClusterProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDBClusterProps>();
    ret.addPropertyResult('engine', 'Engine', cfn_parse.FromCloudFormation.getString(properties.Engine));
    ret.addPropertyResult('associatedRoles', 'AssociatedRoles', properties.AssociatedRoles != null ? cfn_parse.FromCloudFormation.getArray(CfnDBClusterDBClusterRolePropertyFromCloudFormation)(properties.AssociatedRoles) : undefined);
    ret.addPropertyResult('availabilityZones', 'AvailabilityZones', properties.AvailabilityZones != null ? cfn_parse.FromCloudFormation.getStringArray(properties.AvailabilityZones) : undefined);
    ret.addPropertyResult('backtrackWindow', 'BacktrackWindow', properties.BacktrackWindow != null ? cfn_parse.FromCloudFormation.getNumber(properties.BacktrackWindow) : undefined);
    ret.addPropertyResult('backupRetentionPeriod', 'BackupRetentionPeriod', properties.BackupRetentionPeriod != null ? cfn_parse.FromCloudFormation.getNumber(properties.BackupRetentionPeriod) : undefined);
    ret.addPropertyResult('copyTagsToSnapshot', 'CopyTagsToSnapshot', properties.CopyTagsToSnapshot != null ? cfn_parse.FromCloudFormation.getBoolean(properties.CopyTagsToSnapshot) : undefined);
    ret.addPropertyResult('databaseName', 'DatabaseName', properties.DatabaseName != null ? cfn_parse.FromCloudFormation.getString(properties.DatabaseName) : undefined);
    ret.addPropertyResult('dbClusterIdentifier', 'DBClusterIdentifier', properties.DBClusterIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.DBClusterIdentifier) : undefined);
    ret.addPropertyResult('dbClusterParameterGroupName', 'DBClusterParameterGroupName', properties.DBClusterParameterGroupName != null ? cfn_parse.FromCloudFormation.getString(properties.DBClusterParameterGroupName) : undefined);
    ret.addPropertyResult('dbSubnetGroupName', 'DBSubnetGroupName', properties.DBSubnetGroupName != null ? cfn_parse.FromCloudFormation.getString(properties.DBSubnetGroupName) : undefined);
    ret.addPropertyResult('deletionProtection', 'DeletionProtection', properties.DeletionProtection != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DeletionProtection) : undefined);
    ret.addPropertyResult('enableCloudwatchLogsExports', 'EnableCloudwatchLogsExports', properties.EnableCloudwatchLogsExports != null ? cfn_parse.FromCloudFormation.getStringArray(properties.EnableCloudwatchLogsExports) : undefined);
    ret.addPropertyResult('enableHttpEndpoint', 'EnableHttpEndpoint', properties.EnableHttpEndpoint != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableHttpEndpoint) : undefined);
    ret.addPropertyResult('enableIamDatabaseAuthentication', 'EnableIAMDatabaseAuthentication', properties.EnableIAMDatabaseAuthentication != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableIAMDatabaseAuthentication) : undefined);
    ret.addPropertyResult('engineMode', 'EngineMode', properties.EngineMode != null ? cfn_parse.FromCloudFormation.getString(properties.EngineMode) : undefined);
    ret.addPropertyResult('engineVersion', 'EngineVersion', properties.EngineVersion != null ? cfn_parse.FromCloudFormation.getString(properties.EngineVersion) : undefined);
    ret.addPropertyResult('globalClusterIdentifier', 'GlobalClusterIdentifier', properties.GlobalClusterIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.GlobalClusterIdentifier) : undefined);
    ret.addPropertyResult('kmsKeyId', 'KmsKeyId', properties.KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyId) : undefined);
    ret.addPropertyResult('masterUsername', 'MasterUsername', properties.MasterUsername != null ? cfn_parse.FromCloudFormation.getString(properties.MasterUsername) : undefined);
    ret.addPropertyResult('masterUserPassword', 'MasterUserPassword', properties.MasterUserPassword != null ? cfn_parse.FromCloudFormation.getString(properties.MasterUserPassword) : undefined);
    ret.addPropertyResult('port', 'Port', properties.Port != null ? cfn_parse.FromCloudFormation.getNumber(properties.Port) : undefined);
    ret.addPropertyResult('preferredBackupWindow', 'PreferredBackupWindow', properties.PreferredBackupWindow != null ? cfn_parse.FromCloudFormation.getString(properties.PreferredBackupWindow) : undefined);
    ret.addPropertyResult('preferredMaintenanceWindow', 'PreferredMaintenanceWindow', properties.PreferredMaintenanceWindow != null ? cfn_parse.FromCloudFormation.getString(properties.PreferredMaintenanceWindow) : undefined);
    ret.addPropertyResult('replicationSourceIdentifier', 'ReplicationSourceIdentifier', properties.ReplicationSourceIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.ReplicationSourceIdentifier) : undefined);
    ret.addPropertyResult('restoreType', 'RestoreType', properties.RestoreType != null ? cfn_parse.FromCloudFormation.getString(properties.RestoreType) : undefined);
    ret.addPropertyResult('scalingConfiguration', 'ScalingConfiguration', properties.ScalingConfiguration != null ? CfnDBClusterScalingConfigurationPropertyFromCloudFormation(properties.ScalingConfiguration) : undefined);
    ret.addPropertyResult('snapshotIdentifier', 'SnapshotIdentifier', properties.SnapshotIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.SnapshotIdentifier) : undefined);
    ret.addPropertyResult('sourceDbClusterIdentifier', 'SourceDBClusterIdentifier', properties.SourceDBClusterIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.SourceDBClusterIdentifier) : undefined);
    ret.addPropertyResult('sourceRegion', 'SourceRegion', properties.SourceRegion != null ? cfn_parse.FromCloudFormation.getString(properties.SourceRegion) : undefined);
    ret.addPropertyResult('storageEncrypted', 'StorageEncrypted', properties.StorageEncrypted != null ? cfn_parse.FromCloudFormation.getBoolean(properties.StorageEncrypted) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('useLatestRestorableTime', 'UseLatestRestorableTime', properties.UseLatestRestorableTime != null ? cfn_parse.FromCloudFormation.getBoolean(properties.UseLatestRestorableTime) : undefined);
    ret.addPropertyResult('vpcSecurityGroupIds', 'VpcSecurityGroupIds', properties.VpcSecurityGroupIds != null ? cfn_parse.FromCloudFormation.getStringArray(properties.VpcSecurityGroupIds) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::RDS::DBCluster`
 *
 * The `AWS::RDS::DBCluster` resource creates an Amazon Aurora DB cluster. For more information, see [Managing an Amazon Aurora DB Cluster](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_Aurora.html) in the *Amazon Aurora User Guide* .
 *
 * > You can only create this resource in AWS Regions where Amazon Aurora is supported.
 *
 * This topic covers the resource for Amazon Aurora DB clusters. For the documentation on the resource for Amazon RDS DB instances, see [AWS::RDS::DBInstance](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html) .
 *
 * *Updating DB clusters*
 *
 * When properties labeled " *Update requires:* [Replacement](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-update-behaviors.html#update-replacement) " are updated, AWS CloudFormation first creates a replacement DB cluster, then changes references from other dependent resources to point to the replacement DB cluster, and finally deletes the old DB cluster.
 *
 * > We highly recommend that you take a snapshot of the database before updating the stack. If you don't, you lose the data when AWS CloudFormation replaces your DB cluster. To preserve your data, perform the following procedure:
 * >
 * > - Deactivate any applications that are using the DB cluster so that there's no activity on the DB instance.
 * > - Create a snapshot of the DB cluster. For more information about creating DB snapshots, see [Creating a DB Cluster Snapshot](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_CreateSnapshotCluster.html) .
 * > - If you want to restore your DB cluster using a DB cluster snapshot, modify the updated template with your DB cluster changes and add the `SnapshotIdentifier` property with the ID of the DB cluster snapshot that you want to use.
 * >
 * > After you restore a DB cluster with a `SnapshotIdentifier` property, you must specify the same `SnapshotIdentifier` property for any future updates to the DB cluster. When you specify this property for an update, the DB cluster is not restored from the DB cluster snapshot again, and the data in the database is not changed. However, if you don't specify the `SnapshotIdentifier` property, an empty DB cluster is created, and the original DB cluster is deleted. If you specify a property that is different from the previous snapshot restore property, a new DB cluster is restored from the specified `SnapshotIdentifier` property, and the original DB cluster is deleted.
 * > - Update the stack.
 *
 * Currently, when you are updating the stack for an Aurora Serverless DB cluster, you can't include changes to any other properties when you specify one of the following properties: `PreferredBackupWindow` , `PreferredMaintenanceWindow` , and `Port` . This limitation doesn't apply to provisioned DB clusters.
 *
 * For more information about updating other properties of this resource, see `[ModifyDBCluster](https://docs.aws.amazon.com//AmazonRDS/latest/APIReference/API_ModifyDBCluster.html)` . For more information about updating stacks, see [AWS CloudFormation Stacks Updates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks.html) .
 *
 * *Deleting DB clusters*
 *
 * The default `DeletionPolicy` for `AWS::RDS::DBCluster` resources is `Snapshot` . For more information about how AWS CloudFormation deletes resources, see [DeletionPolicy Attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html) .
 *
 * @cloudformationResource AWS::RDS::DBCluster
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html
 */
export class CfnDBCluster extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::RDS::DBCluster";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDBCluster {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDBClusterPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDBCluster(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The connection endpoint for the DB cluster. For example: `mystack-mydbcluster-123456789012.us-east-2.rds.amazonaws.com`
     * @cloudformationAttribute Endpoint.Address
     */
    public readonly attrEndpointAddress: string;

    /**
     * The port number that will accept connections on this DB cluster. For example: `3306`
     * @cloudformationAttribute Endpoint.Port
     */
    public readonly attrEndpointPort: string;

    /**
     * The reader endpoint for the DB cluster. For example: `mystack-mydbcluster-ro-123456789012.us-east-2.rds.amazonaws.com`
     * @cloudformationAttribute ReadEndpoint.Address
     */
    public readonly attrReadEndpointAddress: string;

    /**
     * The name of the database engine to be used for this DB cluster.
     *
     * Valid Values: `aurora` (for MySQL 5.6-compatible Aurora), `aurora-mysql` (for MySQL 5.7-compatible Aurora), and `aurora-postgresql`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-engine
     */
    public engine: string;

    /**
     * Provides a list of the AWS Identity and Access Management (IAM) roles that are associated with the DB cluster. IAM roles that are associated with a DB cluster grant permission for the DB cluster to access other Amazon Web Services on your behalf.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-associatedroles
     */
    public associatedRoles: Array<CfnDBCluster.DBClusterRoleProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * A list of Availability Zones (AZs) where instances in the DB cluster can be created. For information on AWS Regions and Availability Zones, see [Choosing the Regions and Availability Zones](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Concepts.RegionsAndAvailabilityZones.html) in the *Amazon Aurora User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-availabilityzones
     */
    public availabilityZones: string[] | undefined;

    /**
     * The target backtrack window, in seconds. To disable backtracking, set this value to 0.
     *
     * > Currently, Backtrack is only supported for Aurora MySQL DB clusters.
     *
     * Default: 0
     *
     * Constraints:
     *
     * - If specified, this value must be set to a number from 0 to 259,200 (72 hours).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-backtrackwindow
     */
    public backtrackWindow: number | undefined;

    /**
     * The number of days for which automated backups are retained.
     *
     * Default: 1
     *
     * Constraints:
     *
     * - Must be a value from 1 to 35
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-backuprententionperiod
     */
    public backupRetentionPeriod: number | undefined;

    /**
     * A value that indicates whether to copy all tags from the DB cluster to snapshots of the DB cluster. The default is not to copy them.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-copytagstosnapshot
     */
    public copyTagsToSnapshot: boolean | cdk.IResolvable | undefined;

    /**
     * The name of your database. If you don't provide a name, then Amazon RDS won't create a database in this DB cluster. For naming constraints, see [Naming Constraints](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_Limits.html#RDS_Limits.Constraints) in the *Amazon Aurora User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-databasename
     */
    public databaseName: string | undefined;

    /**
     * The DB cluster identifier. This parameter is stored as a lowercase string.
     *
     * Constraints:
     *
     * - Must contain from 1 to 63 letters, numbers, or hyphens.
     * - First character must be a letter.
     * - Can't end with a hyphen or contain two consecutive hyphens.
     *
     * Example: `my-cluster1`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-dbclusteridentifier
     */
    public dbClusterIdentifier: string | undefined;

    /**
     * The name of the DB cluster parameter group to associate with this DB cluster.
     *
     * > If you apply a parameter group to an existing DB cluster, then its DB instances might need to reboot. This can result in an outage while the DB instances are rebooting.
     * >
     * > If you apply a change to parameter group associated with a stopped DB cluster, then the update stack waits until the DB cluster is started.
     *
     * To list all of the available DB cluster parameter group names, use the following command:
     *
     * `aws rds describe-db-cluster-parameter-groups --query "DBClusterParameterGroups[].DBClusterParameterGroupName" --output text`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-dbclusterparametergroupname
     */
    public dbClusterParameterGroupName: string | undefined;

    /**
     * A DB subnet group that you want to associate with this DB cluster.
     *
     * If you are restoring a DB cluster to a point in time with `RestoreType` set to `copy-on-write` , and don't specify a DB subnet group name, then the DB cluster is restored with a default DB subnet group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-dbsubnetgroupname
     */
    public dbSubnetGroupName: string | undefined;

    /**
     * A value that indicates whether the DB cluster has deletion protection enabled. The database can't be deleted when deletion protection is enabled. By default, deletion protection is disabled.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-deletionprotection
     */
    public deletionProtection: boolean | cdk.IResolvable | undefined;

    /**
     * The list of log types that need to be enabled for exporting to CloudWatch Logs. The values in the list depend on the DB engine being used. For more information, see [Publishing Database Logs to Amazon CloudWatch Logs](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_LogAccess.html#USER_LogAccess.Procedural.UploadtoCloudWatch) in the *Amazon Aurora User Guide* .
     *
     * *Aurora MySQL*
     *
     * Valid values: `audit` , `error` , `general` , `slowquery`
     *
     * *Aurora PostgreSQL*
     *
     * Valid values: `postgresql`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-enablecloudwatchlogsexports
     */
    public enableCloudwatchLogsExports: string[] | undefined;

    /**
     * A value that indicates whether to enable the HTTP endpoint for an Aurora Serverless DB cluster. By default, the HTTP endpoint is disabled.
     *
     * When enabled, the HTTP endpoint provides a connectionless web service API for running SQL queries on the Aurora Serverless DB cluster. You can also query your database from inside the RDS console with the query editor.
     *
     * For more information, see [Using the Data API for Aurora Serverless](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/data-api.html) in the *Amazon Aurora User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-enablehttpendpoint
     */
    public enableHttpEndpoint: boolean | cdk.IResolvable | undefined;

    /**
     * A value that indicates whether to enable mapping of AWS Identity and Access Management (IAM) accounts to database accounts. By default, mapping is disabled.
     *
     * For more information, see [IAM Database Authentication](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.IAMDBAuth.html) in the *Amazon Aurora User Guide.*
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-enableiamdatabaseauthentication
     */
    public enableIamDatabaseAuthentication: boolean | cdk.IResolvable | undefined;

    /**
     * The DB engine mode of the DB cluster, either `provisioned` , `serverless` , `parallelquery` , `global` , or `multimaster` .
     *
     * The `parallelquery` engine mode isn't required for Aurora MySQL version 1.23 and higher 1.x versions, and version 2.09 and higher 2.x versions.
     *
     * The `global` engine mode isn't required for Aurora MySQL version 1.22 and higher 1.x versions, and `global` engine mode isn't required for any 2.x versions.
     *
     * The `multimaster` engine mode only applies for DB clusters created with Aurora MySQL version 5.6.10a.
     *
     * For Aurora PostgreSQL, the `global` engine mode isn't required, and both the `parallelquery` and the `multimaster` engine modes currently aren't supported.
     *
     * Limitations and requirements apply to some DB engine modes. For more information, see the following sections in the *Amazon Aurora User Guide* :
     *
     * - [Limitations of Aurora Serverless](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless.html#aurora-serverless.limitations)
     * - [Limitations of Parallel Query](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-mysql-parallel-query.html#aurora-mysql-parallel-query-limitations)
     * - [Limitations of Aurora Global Databases](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html#aurora-global-database.limitations)
     * - [Limitations of Multi-Master Clusters](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-multi-master.html#aurora-multi-master-limitations)
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-enginemode
     */
    public engineMode: string | undefined;

    /**
     * The version number of the database engine to use.
     *
     * To list all of the available engine versions for `aurora` (for MySQL 5.6-compatible Aurora), use the following command:
     *
     * `aws rds describe-db-engine-versions --engine aurora --query "DBEngineVersions[].EngineVersion"`
     *
     * To list all of the available engine versions for `aurora-mysql` (for MySQL 5.7-compatible Aurora), use the following command:
     *
     * `aws rds describe-db-engine-versions --engine aurora-mysql --query "DBEngineVersions[].EngineVersion"`
     *
     * To list all of the available engine versions for `aurora-postgresql` , use the following command:
     *
     * `aws rds describe-db-engine-versions --engine aurora-postgresql --query "DBEngineVersions[].EngineVersion"`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-engineversion
     */
    public engineVersion: string | undefined;

    /**
     * If you are configuring an Aurora global database cluster and want your Aurora DB cluster to be a secondary member in the global database cluster, specify the global cluster ID of the global database cluster. To define the primary database cluster of the global cluster, use the [AWS::RDS::GlobalCluster](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html) resource.
     *
     * If you aren't configuring a global database cluster, don't specify this property.
     *
     * > To remove the DB cluster from a global database cluster, specify an empty value for the `GlobalClusterIdentifier` property.
     *
     * For information about Aurora global databases, see [Working with Amazon Aurora Global Databases](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html) in the *Amazon Aurora User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-globalclusteridentifier
     */
    public globalClusterIdentifier: string | undefined;

    /**
     * The Amazon Resource Name (ARN) of the AWS KMS key that is used to encrypt the database instances in the DB cluster, such as `arn:aws:kms:us-east-1:012345678910:key/abcd1234-a123-456a-a12b-a123b4cd56ef` . If you enable the `StorageEncrypted` property but don't specify this property, the default KMS key is used. If you specify this property, you must set the `StorageEncrypted` property to `true` .
     *
     * If you specify the `SnapshotIdentifier` property, the `StorageEncrypted` property value is inherited from the snapshot, and if the DB cluster is encrypted, the specified `KmsKeyId` property is used.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-kmskeyid
     */
    public kmsKeyId: string | undefined;

    /**
     * The name of the master user for the DB cluster.
     *
     * > If you specify the `SourceDBClusterIdentifier` , `SnapshotIdentifier` , or `GlobalClusterIdentifier` property, don't specify this property. The value is inherited from the source DB cluster, the snapshot, or the primary DB cluster for the global database cluster, respectively.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-masterusername
     */
    public masterUsername: string | undefined;

    /**
     * The master password for the DB instance.
     *
     * > If you specify the `SourceDBClusterIdentifier` , `SnapshotIdentifier` , or `GlobalClusterIdentifier` property, don't specify this property. The value is inherited from the source DB cluster, the snapshot, or the primary DB cluster for the global database cluster, respectively.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-masteruserpassword
     */
    public masterUserPassword: string | undefined;

    /**
     * The port number on which the DB instances in the DB cluster accept connections.
     *
     * Default:
     *
     * - When `EngineMode` is `provisioned` , `3306` (for both Aurora MySQL and Aurora PostgreSQL)
     * - When `EngineMode` is `serverless` :
     *
     * - `3306` when `Engine` is `aurora` or `aurora-mysql`
     * - `5432` when `Engine` is `aurora-postgresql`
     *
     * > The `No interruption` on update behavior only applies to DB clusters. If you are updating a DB instance, see [Port](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-port) for the AWS::RDS::DBInstance resource.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-port
     */
    public port: number | undefined;

    /**
     * The daily time range during which automated backups are created. For more information, see [Backup Window](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Backups.html#Aurora.Managing.Backups.BackupWindow) in the *Amazon Aurora User Guide.*
     *
     * Constraints:
     *
     * - Must be in the format `hh24:mi-hh24:mi` .
     * - Must be in Universal Coordinated Time (UTC).
     * - Must not conflict with the preferred maintenance window.
     * - Must be at least 30 minutes.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-preferredbackupwindow
     */
    public preferredBackupWindow: string | undefined;

    /**
     * The weekly time range during which system maintenance can occur, in Universal Coordinated Time (UTC).
     *
     * Format: `ddd:hh24:mi-ddd:hh24:mi`
     *
     * The default is a 30-minute window selected at random from an 8-hour block of time for each AWS Region, occurring on a random day of the week. To see the time blocks available, see [Adjusting the Preferred DB Cluster Maintenance Window](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_UpgradeDBInstance.Maintenance.html#AdjustingTheMaintenanceWindow.Aurora) in the *Amazon Aurora User Guide.*
     *
     * Valid Days: Mon, Tue, Wed, Thu, Fri, Sat, Sun.
     *
     * Constraints: Minimum 30-minute window.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-preferredmaintenancewindow
     */
    public preferredMaintenanceWindow: string | undefined;

    /**
     * The Amazon Resource Name (ARN) of the source DB instance or DB cluster if this DB cluster is created as a read replica.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-replicationsourceidentifier
     */
    public replicationSourceIdentifier: string | undefined;

    /**
     * The type of restore to be performed. You can specify one of the following values:
     *
     * - `full-copy` - The new DB cluster is restored as a full copy of the source DB cluster.
     * - `copy-on-write` - The new DB cluster is restored as a clone of the source DB cluster.
     *
     * Constraints: You can't specify `copy-on-write` if the engine version of the source DB cluster is earlier than 1.11.
     *
     * If you don't specify a `RestoreType` value, then the new DB cluster is restored as a full copy of the source DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-restoretype
     */
    public restoreType: string | undefined;

    /**
     * The `ScalingConfiguration` property type specifies the scaling configuration of an Aurora Serverless DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-scalingconfiguration
     */
    public scalingConfiguration: CfnDBCluster.ScalingConfigurationProperty | cdk.IResolvable | undefined;

    /**
     * The identifier for the DB snapshot or DB cluster snapshot to restore from.
     *
     * You can use either the name or the Amazon Resource Name (ARN) to specify a DB cluster snapshot. However, you can use only the ARN to specify a DB snapshot.
     *
     * After you restore a DB cluster with a `SnapshotIdentifier` property, you must specify the same `SnapshotIdentifier` property for any future updates to the DB cluster. When you specify this property for an update, the DB cluster is not restored from the snapshot again, and the data in the database is not changed. However, if you don't specify the `SnapshotIdentifier` property, an empty DB cluster is created, and the original DB cluster is deleted. If you specify a property that is different from the previous snapshot restore property, a new DB cluster is restored from the specified `SnapshotIdentifier` property, and the original DB cluster is deleted.
     *
     * If you specify the `SnapshotIdentifier` property to restore a DB cluster (as opposed to specifying it for DB cluster updates), then don't specify the following properties:
     *
     * - `GlobalClusterIdentifier`
     * - `MasterUsername`
     * - `ReplicationSourceIdentifier`
     * - `RestoreType`
     * - `SourceDBClusterIdentifier`
     * - `SourceRegion`
     * - `StorageEncrypted`
     * - `UseLatestRestorableTime`
     *
     * Constraints:
     *
     * - Must match the identifier of an existing Snapshot.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-snapshotidentifier
     */
    public snapshotIdentifier: string | undefined;

    /**
     * When restoring a DB cluster to a point in time, the identifier of the source DB cluster from which to restore.
     *
     * Constraints:
     *
     * - Must match the identifier of an existing DBCluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-sourcedbclusteridentifier
     */
    public sourceDbClusterIdentifier: string | undefined;

    /**
     * The AWS Region which contains the source DB cluster when replicating a DB cluster. For example, `us-east-1` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-sourceregion
     */
    public sourceRegion: string | undefined;

    /**
     * Indicates whether the DB cluster is encrypted.
     *
     * If you specify the `KmsKeyId` property, then you must enable encryption.
     *
     * If you specify the `SnapshotIdentifier` or `SourceDBClusterIdentifier` property, don't specify this property. The value is inherited from the snapshot or source DB cluster, and if the DB cluster is encrypted, the specified `KmsKeyId` property is used.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-storageencrypted
     */
    public storageEncrypted: boolean | cdk.IResolvable | undefined;

    /**
     * Tags to assign to the DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * A value that indicates whether to restore the DB cluster to the latest restorable backup time. By default, the DB cluster is not restored to the latest restorable backup time.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-uselatestrestorabletime
     */
    public useLatestRestorableTime: boolean | cdk.IResolvable | undefined;

    /**
     * A list of EC2 VPC security groups to associate with this DB cluster.
     *
     * If you plan to update the resource, don't specify VPC security groups in a shared VPC.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html#cfn-rds-dbcluster-vpcsecuritygroupids
     */
    public vpcSecurityGroupIds: string[] | undefined;

    /**
     * Create a new `AWS::RDS::DBCluster`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDBClusterProps) {
        super(scope, id, { type: CfnDBCluster.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'engine', this);
        this.attrEndpointAddress = cdk.Token.asString(this.getAtt('Endpoint.Address'));
        this.attrEndpointPort = cdk.Token.asString(this.getAtt('Endpoint.Port'));
        this.attrReadEndpointAddress = cdk.Token.asString(this.getAtt('ReadEndpoint.Address'));

        this.engine = props.engine;
        this.associatedRoles = props.associatedRoles;
        this.availabilityZones = props.availabilityZones;
        this.backtrackWindow = props.backtrackWindow;
        this.backupRetentionPeriod = props.backupRetentionPeriod;
        this.copyTagsToSnapshot = props.copyTagsToSnapshot;
        this.databaseName = props.databaseName;
        this.dbClusterIdentifier = props.dbClusterIdentifier;
        this.dbClusterParameterGroupName = props.dbClusterParameterGroupName;
        this.dbSubnetGroupName = props.dbSubnetGroupName;
        this.deletionProtection = props.deletionProtection;
        this.enableCloudwatchLogsExports = props.enableCloudwatchLogsExports;
        this.enableHttpEndpoint = props.enableHttpEndpoint;
        this.enableIamDatabaseAuthentication = props.enableIamDatabaseAuthentication;
        this.engineMode = props.engineMode;
        this.engineVersion = props.engineVersion;
        this.globalClusterIdentifier = props.globalClusterIdentifier;
        this.kmsKeyId = props.kmsKeyId;
        this.masterUsername = props.masterUsername;
        this.masterUserPassword = props.masterUserPassword;
        this.port = props.port;
        this.preferredBackupWindow = props.preferredBackupWindow;
        this.preferredMaintenanceWindow = props.preferredMaintenanceWindow;
        this.replicationSourceIdentifier = props.replicationSourceIdentifier;
        this.restoreType = props.restoreType;
        this.scalingConfiguration = props.scalingConfiguration;
        this.snapshotIdentifier = props.snapshotIdentifier;
        this.sourceDbClusterIdentifier = props.sourceDbClusterIdentifier;
        this.sourceRegion = props.sourceRegion;
        this.storageEncrypted = props.storageEncrypted;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::RDS::DBCluster", props.tags, { tagPropertyName: 'tags' });
        this.useLatestRestorableTime = props.useLatestRestorableTime;
        this.vpcSecurityGroupIds = props.vpcSecurityGroupIds;
        if (this.node.scope && cdk.Resource.isResource(this.node.scope)) {
            this.node.addValidation({ validate: () => this.cfnOptions.deletionPolicy === undefined
              ? ['\'AWS::RDS::DBCluster\' is a stateful resource type, and you must specify a Removal Policy for it. Call \'resource.applyRemovalPolicy()\'.']
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
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDBCluster.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            engine: this.engine,
            associatedRoles: this.associatedRoles,
            availabilityZones: this.availabilityZones,
            backtrackWindow: this.backtrackWindow,
            backupRetentionPeriod: this.backupRetentionPeriod,
            copyTagsToSnapshot: this.copyTagsToSnapshot,
            databaseName: this.databaseName,
            dbClusterIdentifier: this.dbClusterIdentifier,
            dbClusterParameterGroupName: this.dbClusterParameterGroupName,
            dbSubnetGroupName: this.dbSubnetGroupName,
            deletionProtection: this.deletionProtection,
            enableCloudwatchLogsExports: this.enableCloudwatchLogsExports,
            enableHttpEndpoint: this.enableHttpEndpoint,
            enableIamDatabaseAuthentication: this.enableIamDatabaseAuthentication,
            engineMode: this.engineMode,
            engineVersion: this.engineVersion,
            globalClusterIdentifier: this.globalClusterIdentifier,
            kmsKeyId: this.kmsKeyId,
            masterUsername: this.masterUsername,
            masterUserPassword: this.masterUserPassword,
            port: this.port,
            preferredBackupWindow: this.preferredBackupWindow,
            preferredMaintenanceWindow: this.preferredMaintenanceWindow,
            replicationSourceIdentifier: this.replicationSourceIdentifier,
            restoreType: this.restoreType,
            scalingConfiguration: this.scalingConfiguration,
            snapshotIdentifier: this.snapshotIdentifier,
            sourceDbClusterIdentifier: this.sourceDbClusterIdentifier,
            sourceRegion: this.sourceRegion,
            storageEncrypted: this.storageEncrypted,
            tags: this.tags.renderTags(),
            useLatestRestorableTime: this.useLatestRestorableTime,
            vpcSecurityGroupIds: this.vpcSecurityGroupIds,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDBClusterPropsToCloudFormation(props);
    }
}

export namespace CfnDBCluster {
    /**
     * Describes an AWS Identity and Access Management (IAM) role that is associated with a DB cluster.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbcluster-dbclusterrole.html
     */
    export interface DBClusterRoleProperty {
        /**
         * The name of the feature associated with the AWS Identity and Access Management (IAM) role. IAM roles that are associated with a DB cluster grant permission for the DB cluster to access other AWS services on your behalf. For the list of supported feature names, see the `SupportedFeatureNames` description in [DBEngineVersion](https://docs.aws.amazon.com/AmazonRDS/latest/APIReference/API_DBEngineVersion.html) in the *Amazon RDS API Reference* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbcluster-dbclusterrole.html#cfn-rds-dbcluster-dbclusterrole-featurename
         */
        readonly featureName?: string;
        /**
         * The Amazon Resource Name (ARN) of the IAM role that is associated with the DB cluster.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbcluster-dbclusterrole.html#cfn-rds-dbcluster-dbclusterrole-rolearn
         */
        readonly roleArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `DBClusterRoleProperty`
 *
 * @param properties - the TypeScript properties of a `DBClusterRoleProperty`
 *
 * @returns the result of the validation.
 */
function CfnDBCluster_DBClusterRolePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('featureName', cdk.validateString)(properties.featureName));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    return errors.wrap('supplied properties not correct for "DBClusterRoleProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::DBCluster.DBClusterRole` resource
 *
 * @param properties - the TypeScript properties of a `DBClusterRoleProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::DBCluster.DBClusterRole` resource.
 */
// @ts-ignore TS6133
function cfnDBClusterDBClusterRolePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDBCluster_DBClusterRolePropertyValidator(properties).assertSuccess();
    return {
        FeatureName: cdk.stringToCloudFormation(properties.featureName),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
    };
}

// @ts-ignore TS6133
function CfnDBClusterDBClusterRolePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDBCluster.DBClusterRoleProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDBCluster.DBClusterRoleProperty>();
    ret.addPropertyResult('featureName', 'FeatureName', properties.FeatureName != null ? cfn_parse.FromCloudFormation.getString(properties.FeatureName) : undefined);
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDBCluster {
    /**
     * The `ScalingConfiguration` property type specifies the scaling configuration of an Aurora Serverless DB cluster.
     *
     * For more information, see [Using Amazon Aurora Serverless](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless.html) in the *Amazon Aurora User Guide* .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbcluster-scalingconfiguration.html
     */
    export interface ScalingConfigurationProperty {
        /**
         * A value that indicates whether to allow or disallow automatic pause for an Aurora DB cluster in `serverless` DB engine mode. A DB cluster can be paused only when it's idle (it has no connections).
         *
         * > If a DB cluster is paused for more than seven days, the DB cluster might be backed up with a snapshot. In this case, the DB cluster is restored when there is a request to connect to it.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbcluster-scalingconfiguration.html#cfn-rds-dbcluster-scalingconfiguration-autopause
         */
        readonly autoPause?: boolean | cdk.IResolvable;
        /**
         * The maximum capacity for an Aurora DB cluster in `serverless` DB engine mode.
         *
         * For Aurora MySQL, valid capacity values are `1` , `2` , `4` , `8` , `16` , `32` , `64` , `128` , and `256` .
         *
         * For Aurora PostgreSQL, valid capacity values are `2` , `4` , `8` , `16` , `32` , `64` , `192` , and `384` .
         *
         * The maximum capacity must be greater than or equal to the minimum capacity.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbcluster-scalingconfiguration.html#cfn-rds-dbcluster-scalingconfiguration-maxcapacity
         */
        readonly maxCapacity?: number;
        /**
         * The minimum capacity for an Aurora DB cluster in `serverless` DB engine mode.
         *
         * For Aurora MySQL, valid capacity values are `1` , `2` , `4` , `8` , `16` , `32` , `64` , `128` , and `256` .
         *
         * For Aurora PostgreSQL, valid capacity values are `2` , `4` , `8` , `16` , `32` , `64` , `192` , and `384` .
         *
         * The minimum capacity must be less than or equal to the maximum capacity.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbcluster-scalingconfiguration.html#cfn-rds-dbcluster-scalingconfiguration-mincapacity
         */
        readonly minCapacity?: number;
        /**
         * The time, in seconds, before an Aurora DB cluster in `serverless` mode is paused.
         *
         * Specify a value between 300 and 86,400 seconds.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbcluster-scalingconfiguration.html#cfn-rds-dbcluster-scalingconfiguration-secondsuntilautopause
         */
        readonly secondsUntilAutoPause?: number;
    }
}

/**
 * Determine whether the given properties match those of a `ScalingConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `ScalingConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnDBCluster_ScalingConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('autoPause', cdk.validateBoolean)(properties.autoPause));
    errors.collect(cdk.propertyValidator('maxCapacity', cdk.validateNumber)(properties.maxCapacity));
    errors.collect(cdk.propertyValidator('minCapacity', cdk.validateNumber)(properties.minCapacity));
    errors.collect(cdk.propertyValidator('secondsUntilAutoPause', cdk.validateNumber)(properties.secondsUntilAutoPause));
    return errors.wrap('supplied properties not correct for "ScalingConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::DBCluster.ScalingConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `ScalingConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::DBCluster.ScalingConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnDBClusterScalingConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDBCluster_ScalingConfigurationPropertyValidator(properties).assertSuccess();
    return {
        AutoPause: cdk.booleanToCloudFormation(properties.autoPause),
        MaxCapacity: cdk.numberToCloudFormation(properties.maxCapacity),
        MinCapacity: cdk.numberToCloudFormation(properties.minCapacity),
        SecondsUntilAutoPause: cdk.numberToCloudFormation(properties.secondsUntilAutoPause),
    };
}

// @ts-ignore TS6133
function CfnDBClusterScalingConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDBCluster.ScalingConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDBCluster.ScalingConfigurationProperty>();
    ret.addPropertyResult('autoPause', 'AutoPause', properties.AutoPause != null ? cfn_parse.FromCloudFormation.getBoolean(properties.AutoPause) : undefined);
    ret.addPropertyResult('maxCapacity', 'MaxCapacity', properties.MaxCapacity != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxCapacity) : undefined);
    ret.addPropertyResult('minCapacity', 'MinCapacity', properties.MinCapacity != null ? cfn_parse.FromCloudFormation.getNumber(properties.MinCapacity) : undefined);
    ret.addPropertyResult('secondsUntilAutoPause', 'SecondsUntilAutoPause', properties.SecondsUntilAutoPause != null ? cfn_parse.FromCloudFormation.getNumber(properties.SecondsUntilAutoPause) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnDBClusterParameterGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbclusterparametergroup.html
 */
export interface CfnDBClusterParameterGroupProps {

    /**
     * A friendly description for this DB cluster parameter group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbclusterparametergroup.html#cfn-rds-dbclusterparametergroup-description
     */
    readonly description: string;

    /**
     * The DB cluster parameter group family name. A DB cluster parameter group can be associated with one and only one DB cluster parameter group family, and can be applied only to a DB cluster running a DB engine and engine version compatible with that DB cluster parameter group family.
     *
     * > The DB cluster parameter group family can't be changed when updating a DB cluster parameter group.
     *
     * To list all of the available parameter group families, use the following command:
     *
     * `aws rds describe-db-engine-versions --query "DBEngineVersions[].DBParameterGroupFamily"`
     *
     * The output contains duplicates.
     *
     * For more information, see `[CreateDBClusterParameterGroup](https://docs.aws.amazon.com//AmazonRDS/latest/APIReference/API_CreateDBClusterParameterGroup.html)` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbclusterparametergroup.html#cfn-rds-dbclusterparametergroup-family
     */
    readonly family: string;

    /**
     * Provides a list of parameters for the DB cluster parameter group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbclusterparametergroup.html#cfn-rds-dbclusterparametergroup-parameters
     */
    readonly parameters: any | cdk.IResolvable;

    /**
     * Tags to assign to the DB cluster parameter group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbclusterparametergroup.html#cfn-rds-dbclusterparametergroup-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnDBClusterParameterGroupProps`
 *
 * @param properties - the TypeScript properties of a `CfnDBClusterParameterGroupProps`
 *
 * @returns the result of the validation.
 */
function CfnDBClusterParameterGroupPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.requiredValidator)(properties.description));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('family', cdk.requiredValidator)(properties.family));
    errors.collect(cdk.propertyValidator('family', cdk.validateString)(properties.family));
    errors.collect(cdk.propertyValidator('parameters', cdk.requiredValidator)(properties.parameters));
    errors.collect(cdk.propertyValidator('parameters', cdk.validateObject)(properties.parameters));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnDBClusterParameterGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::DBClusterParameterGroup` resource
 *
 * @param properties - the TypeScript properties of a `CfnDBClusterParameterGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::DBClusterParameterGroup` resource.
 */
// @ts-ignore TS6133
function cfnDBClusterParameterGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDBClusterParameterGroupPropsValidator(properties).assertSuccess();
    return {
        Description: cdk.stringToCloudFormation(properties.description),
        Family: cdk.stringToCloudFormation(properties.family),
        Parameters: cdk.objectToCloudFormation(properties.parameters),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnDBClusterParameterGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDBClusterParameterGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDBClusterParameterGroupProps>();
    ret.addPropertyResult('description', 'Description', cfn_parse.FromCloudFormation.getString(properties.Description));
    ret.addPropertyResult('family', 'Family', cfn_parse.FromCloudFormation.getString(properties.Family));
    ret.addPropertyResult('parameters', 'Parameters', cfn_parse.FromCloudFormation.getAny(properties.Parameters));
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::RDS::DBClusterParameterGroup`
 *
 * The `AWS::RDS::DBClusterParameterGroup` resource creates a new Amazon RDS DB cluster parameter group.
 *
 * For information about configuring parameters for Amazon Aurora DB instances, see [Working with DB parameter groups and DB cluster parameter groups](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_WorkingWithParamGroups.html) in the *Amazon Aurora User Guide* .
 *
 * > If you apply a parameter group to a DB cluster, then its DB instances might need to reboot. This can result in an outage while the DB instances are rebooting.
 * >
 * > If you apply a change to parameter group associated with a stopped DB cluster, then the update stack waits until the DB cluster is started.
 *
 * @cloudformationResource AWS::RDS::DBClusterParameterGroup
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbclusterparametergroup.html
 */
export class CfnDBClusterParameterGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::RDS::DBClusterParameterGroup";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDBClusterParameterGroup {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDBClusterParameterGroupPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDBClusterParameterGroup(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * A friendly description for this DB cluster parameter group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbclusterparametergroup.html#cfn-rds-dbclusterparametergroup-description
     */
    public description: string;

    /**
     * The DB cluster parameter group family name. A DB cluster parameter group can be associated with one and only one DB cluster parameter group family, and can be applied only to a DB cluster running a DB engine and engine version compatible with that DB cluster parameter group family.
     *
     * > The DB cluster parameter group family can't be changed when updating a DB cluster parameter group.
     *
     * To list all of the available parameter group families, use the following command:
     *
     * `aws rds describe-db-engine-versions --query "DBEngineVersions[].DBParameterGroupFamily"`
     *
     * The output contains duplicates.
     *
     * For more information, see `[CreateDBClusterParameterGroup](https://docs.aws.amazon.com//AmazonRDS/latest/APIReference/API_CreateDBClusterParameterGroup.html)` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbclusterparametergroup.html#cfn-rds-dbclusterparametergroup-family
     */
    public family: string;

    /**
     * Provides a list of parameters for the DB cluster parameter group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbclusterparametergroup.html#cfn-rds-dbclusterparametergroup-parameters
     */
    public parameters: any | cdk.IResolvable;

    /**
     * Tags to assign to the DB cluster parameter group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbclusterparametergroup.html#cfn-rds-dbclusterparametergroup-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::RDS::DBClusterParameterGroup`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDBClusterParameterGroupProps) {
        super(scope, id, { type: CfnDBClusterParameterGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'description', this);
        cdk.requireProperty(props, 'family', this);
        cdk.requireProperty(props, 'parameters', this);

        this.description = props.description;
        this.family = props.family;
        this.parameters = props.parameters;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::RDS::DBClusterParameterGroup", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDBClusterParameterGroup.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            description: this.description,
            family: this.family,
            parameters: this.parameters,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDBClusterParameterGroupPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnDBInstance`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html
 */
export interface CfnDBInstanceProps {

    /**
     * The compute and memory capacity of the DB instance, for example, `db.m4.large` . Not all DB instance classes are available in all AWS Regions, or for all database engines.
     *
     * For the full list of DB instance classes, and availability for your engine, see [DB Instance Class](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.DBInstanceClass.html) in the *Amazon RDS User Guide.* For more information about DB instance class pricing and AWS Region support for DB instance classes, see [Amazon RDS Pricing](https://docs.aws.amazon.com/rds/pricing/) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbinstanceclass
     */
    readonly dbInstanceClass: string;

    /**
     * The amount of storage (in gigabytes) to be initially allocated for the database instance.
     *
     * > If any value is set in the `Iops` parameter, `AllocatedStorage` must be at least 100 GiB, which corresponds to the minimum Iops value of 1,000. If you increase the `Iops` value (in 1,000 IOPS increments), then you must also increase the `AllocatedStorage` value (in 100-GiB increments).
     *
     * *Amazon Aurora*
     *
     * Not applicable. Aurora cluster volumes automatically grow as the amount of data in your database increases, though you are only charged for the space that you use in an Aurora cluster volume.
     *
     * *MySQL*
     *
     * Constraints to the amount of storage for each storage type are the following:
     *
     * - General Purpose (SSD) storage (gp2): Must be an integer from 20 to 65536.
     * - Provisioned IOPS storage (io1): Must be an integer from 100 to 65536.
     * - Magnetic storage (standard): Must be an integer from 5 to 3072.
     *
     * *MariaDB*
     *
     * Constraints to the amount of storage for each storage type are the following:
     *
     * - General Purpose (SSD) storage (gp2): Must be an integer from 20 to 65536.
     * - Provisioned IOPS storage (io1): Must be an integer from 100 to 65536.
     * - Magnetic storage (standard): Must be an integer from 5 to 3072.
     *
     * *PostgreSQL*
     *
     * Constraints to the amount of storage for each storage type are the following:
     *
     * - General Purpose (SSD) storage (gp2): Must be an integer from 20 to 65536.
     * - Provisioned IOPS storage (io1): Must be an integer from 100 to 65536.
     * - Magnetic storage (standard): Must be an integer from 5 to 3072.
     *
     * *Oracle*
     *
     * Constraints to the amount of storage for each storage type are the following:
     *
     * - General Purpose (SSD) storage (gp2): Must be an integer from 20 to 65536.
     * - Provisioned IOPS storage (io1): Must be an integer from 100 to 65536.
     * - Magnetic storage (standard): Must be an integer from 10 to 3072.
     *
     * *SQL Server*
     *
     * Constraints to the amount of storage for each storage type are the following:
     *
     * - General Purpose (SSD) storage (gp2):
     *
     * - Enterprise and Standard editions: Must be an integer from 20 to 16384.
     * - Web and Express editions: Must be an integer from 20 to 16384.
     * - Provisioned IOPS storage (io1):
     *
     * - Enterprise and Standard editions: Must be an integer from 20 to 16384.
     * - Web and Express editions: Must be an integer from 20 to 16384.
     * - Magnetic storage (standard):
     *
     * - Enterprise and Standard editions: Must be an integer from 20 to 1024.
     * - Web and Express editions: Must be an integer from 20 to 1024.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-allocatedstorage
     */
    readonly allocatedStorage?: string;

    /**
     * A value that indicates whether major version upgrades are allowed. Changing this parameter doesn't result in an outage and the change is asynchronously applied as soon as possible.
     *
     * Constraints: Major version upgrades must be allowed when specifying a value for the `EngineVersion` parameter that is a different major version than the DB instance's current version.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-allowmajorversionupgrade
     */
    readonly allowMajorVersionUpgrade?: boolean | cdk.IResolvable;

    /**
     * The AWS Identity and Access Management (IAM) roles associated with the DB instance.
     *
     * *Amazon Aurora*
     *
     * Not applicable. The associated roles are managed by the DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-associatedroles
     */
    readonly associatedRoles?: Array<CfnDBInstance.DBInstanceRoleProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * A value that indicates whether minor engine upgrades are applied automatically to the DB instance during the maintenance window. By default, minor engine upgrades are applied automatically.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-autominorversionupgrade
     */
    readonly autoMinorVersionUpgrade?: boolean | cdk.IResolvable;

    /**
     * The Availability Zone (AZ) where the database will be created. For information on AWS Regions and Availability Zones, see [Regions and Availability Zones](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html) .
     *
     * *Amazon Aurora*
     *
     * Each Aurora DB cluster hosts copies of its storage in three separate Availability Zones. Specify one of these Availability Zones. Aurora automatically chooses an appropriate Availability Zone if you don't specify one.
     *
     * Default: A random, system-chosen Availability Zone in the endpoint's AWS Region .
     *
     * Example: `us-east-1d`
     *
     * Constraint: The `AvailabilityZone` parameter can't be specified if the DB instance is a Multi-AZ deployment. The specified Availability Zone must be in the same AWS Region as the current endpoint.
     *
     * > If you're creating a DB instance in an RDS on VMware environment, specify the identifier of the custom Availability Zone to create the DB instance in.
     * >
     * > For more information about RDS on VMware, see the [RDS on VMware User Guide.](https://docs.aws.amazon.com/AmazonRDS/latest/RDSonVMwareUserGuide/rds-on-vmware.html)
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-availabilityzone
     */
    readonly availabilityZone?: string;

    /**
     * The number of days for which automated backups are retained. Setting this parameter to a positive number enables backups. Setting this parameter to 0 disables automated backups.
     *
     * *Amazon Aurora*
     *
     * Not applicable. The retention period for automated backups is managed by the DB cluster.
     *
     * Default: 1
     *
     * Constraints:
     *
     * - Must be a value from 0 to 35
     * - Can't be set to 0 if the DB instance is a source to read replicas
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-backupretentionperiod
     */
    readonly backupRetentionPeriod?: number;

    /**
     * The identifier of the CA certificate for this DB instance.
     *
     * > Specifying or updating this property triggers a reboot.
     *
     * For more information about CA certificate identifiers for RDS DB engines, see [Rotating Your SSL/TLS Certificate](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.SSL-certificate-rotation.html) in the *Amazon RDS User Guide* .
     *
     * For more information about CA certificate identifiers for Aurora DB engines, see [Rotating Your SSL/TLS Certificate](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.SSL-certificate-rotation.html) in the *Amazon Aurora User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-cacertificateidentifier
     */
    readonly caCertificateIdentifier?: string;

    /**
     * For supported engines, indicates that the DB instance should be associated with the specified character set.
     *
     * *Amazon Aurora*
     *
     * Not applicable. The character set is managed by the DB cluster. For more information, see [AWS::RDS::DBCluster](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-charactersetname
     */
    readonly characterSetName?: string;

    /**
     * A value that indicates whether to copy tags from the DB instance to snapshots of the DB instance. By default, tags are not copied.
     *
     * *Amazon Aurora*
     *
     * Not applicable. Copying tags to snapshots is managed by the DB cluster. Setting this value for an Aurora DB instance has no effect on the DB cluster setting.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-copytagstosnapshot
     */
    readonly copyTagsToSnapshot?: boolean | cdk.IResolvable;

    /**
     * The identifier of the DB cluster that the instance will belong to.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbclusteridentifier
     */
    readonly dbClusterIdentifier?: string;

    /**
     * A name for the DB instance. If you specify a name, AWS CloudFormation converts it to lowercase. If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the DB instance. For more information, see [Name Type](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-name.html) .
     *
     * For information about constraints that apply to DB instance identifiers, see [Naming constraints in Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Limits.html#RDS_Limits.Constraints) in the *Amazon RDS User Guide* .
     *
     * > If you specify a name, you can't perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbinstanceidentifier
     */
    readonly dbInstanceIdentifier?: string;

    /**
     * The meaning of this parameter differs according to the database engine you use.
     *
     * > If you specify the `[DBSnapshotIdentifier](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbsnapshotidentifier)` property, AWS CloudFormation ignores this property.
     * >
     * > If you restore DB instances from snapshots, this property doesn't apply to the MySQL, PostgreSQL, or MariaDB engines.
     *
     * *Amazon Aurora*
     *
     * Not applicable. The database name is managed by the DB cluster.
     *
     * *MySQL*
     *
     * The name of the database to create when the DB instance is created. If this parameter is not specified, no database is created in the DB instance.
     *
     * Constraints:
     *
     * - Must contain 1 to 64 letters or numbers.
     * - Can't be a word reserved by the specified database engine
     *
     * *MariaDB*
     *
     * The name of the database to create when the DB instance is created. If this parameter is not specified, no database is created in the DB instance.
     *
     * Constraints:
     *
     * - Must contain 1 to 64 letters or numbers.
     * - Can't be a word reserved by the specified database engine
     *
     * *PostgreSQL*
     *
     * The name of the database to create when the DB instance is created. If this parameter is not specified, the default `postgres` database is created in the DB instance.
     *
     * Constraints:
     *
     * - Must contain 1 to 63 letters, numbers, or underscores.
     * - Must begin with a letter or an underscore. Subsequent characters can be letters, underscores, or digits (0-9).
     * - Can't be a word reserved by the specified database engine
     *
     * *Oracle*
     *
     * The Oracle System ID (SID) of the created DB instance. If you specify `null` , the default value `ORCL` is used. You can't specify the string NULL, or any other reserved word, for `DBName` .
     *
     * Default: `ORCL`
     *
     * Constraints:
     *
     * - Can't be longer than 8 characters
     *
     * *SQL Server*
     *
     * Not applicable. Must be null.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbname
     */
    readonly dbName?: string;

    /**
     * The name of an existing DB parameter group or a reference to an [AWS::RDS::DBParameterGroup](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbparametergroup.html) resource created in the template.
     *
     * To list all of the available DB parameter group names, use the following command:
     *
     * `aws rds describe-db-parameter-groups --query "DBParameterGroups[].DBParameterGroupName" --output text`
     *
     * > If any of the data members of the referenced parameter group are changed during an update, the DB instance might need to be restarted, which causes some interruption. If the parameter group contains static parameters, whether they were changed or not, an update triggers a reboot.
     *
     * If you don't specify a value for the `DBParameterGroupName` property, the default DB parameter group for the specified engine and engine version is used.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbparametergroupname
     */
    readonly dbParameterGroupName?: string;

    /**
     * A list of the DB security groups to assign to the DB instance. The list can include both the name of existing DB security groups or references to AWS::RDS::DBSecurityGroup resources created in the template.
     *
     * If you set DBSecurityGroups, you must not set VPCSecurityGroups, and vice versa. Also, note that the DBSecurityGroups property exists only for backwards compatibility with older regions and is no longer recommended for providing security information to an RDS DB instance. Instead, use VPCSecurityGroups.
     *
     * > If you specify this property, AWS CloudFormation sends only the following properties (if specified) to Amazon RDS during create operations:
     * >
     * > - `AllocatedStorage`
     * > - `AutoMinorVersionUpgrade`
     * > - `AvailabilityZone`
     * > - `BackupRetentionPeriod`
     * > - `CharacterSetName`
     * > - `DBInstanceClass`
     * > - `DBName`
     * > - `DBParameterGroupName`
     * > - `DBSecurityGroups`
     * > - `DBSubnetGroupName`
     * > - `Engine`
     * > - `EngineVersion`
     * > - `Iops`
     * > - `LicenseModel`
     * > - `MasterUsername`
     * > - `MasterUserPassword`
     * > - `MultiAZ`
     * > - `OptionGroupName`
     * > - `PreferredBackupWindow`
     * > - `PreferredMaintenanceWindow`
     * >
     * > All other properties are ignored. Specify a virtual private cloud (VPC) security group if you want to submit other properties, such as `StorageType` , `StorageEncrypted` , or `KmsKeyId` . If you're already using the `DBSecurityGroups` property, you can't use these other properties by updating your DB instance to use a VPC security group. You must recreate the DB instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbsecuritygroups
     */
    readonly dbSecurityGroups?: string[];

    /**
     * The name or Amazon Resource Name (ARN) of the DB snapshot that's used to restore the DB instance. If you're restoring from a shared manual DB snapshot, you must specify the ARN of the snapshot.
     *
     * By specifying this property, you can create a DB instance from the specified DB snapshot. If the `DBSnapshotIdentifier` property is an empty string or the `AWS::RDS::DBInstance` declaration has no `DBSnapshotIdentifier` property, AWS CloudFormation creates a new database. If the property contains a value (other than an empty string), AWS CloudFormation creates a database from the specified snapshot. If a snapshot with the specified name doesn't exist, AWS CloudFormation can't create the database and it rolls back the stack.
     *
     * Some DB instance properties aren't valid when you restore from a snapshot, such as the `MasterUsername` and `MasterUserPassword` properties. For information about the properties that you can specify, see the `RestoreDBInstanceFromDBSnapshot` action in the *Amazon RDS API Reference* .
     *
     * After you restore a DB instance with a `DBSnapshotIdentifier` property, you must specify the same `DBSnapshotIdentifier` property for any future updates to the DB instance. When you specify this property for an update, the DB instance is not restored from the DB snapshot again, and the data in the database is not changed. However, if you don't specify the `DBSnapshotIdentifier` property, an empty DB instance is created, and the original DB instance is deleted. If you specify a property that is different from the previous snapshot restore property, a new DB instance is restored from the specified `DBSnapshotIdentifier` property, and the original DB instance is deleted.
     *
     * If you specify the `DBSnapshotIdentifier` property to restore a DB instance (as opposed to specifying it for DB instance updates), then don't specify the following properties:
     *
     * - `CharacterSetName`
     * - `DBClusterIdentifier`
     * - `DBName`
     * - `DeleteAutomatedBackups`
     * - `EnablePerformanceInsights`
     * - `KmsKeyId`
     * - `MasterUsername`
     * - `MonitoringInterval`
     * - `MonitoringRoleArn`
     * - `PerformanceInsightsKMSKeyId`
     * - `PerformanceInsightsRetentionPeriod`
     * - `PromotionTier`
     * - `SourceDBInstanceIdentifier`
     * - `SourceRegion`
     * - `StorageEncrypted`
     * - `Timezone`
     *
     * *Amazon Aurora*
     *
     * Not applicable. Snapshot restore is managed by the DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbsnapshotidentifier
     */
    readonly dbSnapshotIdentifier?: string;

    /**
     * A DB subnet group to associate with the DB instance. If you update this value, the new subnet group must be a subnet group in a new VPC.
     *
     * If there's no DB subnet group, then the DB instance isn't a VPC DB instance.
     *
     * For more information about using Amazon RDS in a VPC, see [Using Amazon RDS with Amazon Virtual Private Cloud (VPC)](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.html) in the *Amazon RDS User Guide* .
     *
     * *Amazon Aurora*
     *
     * Not applicable. The DB subnet group is managed by the DB cluster. If specified, the setting must match the DB cluster setting.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbsubnetgroupname
     */
    readonly dbSubnetGroupName?: string;

    /**
     * A value that indicates whether to remove automated backups immediately after the DB instance is deleted. This parameter isn't case-sensitive. The default is to remove automated backups immediately after the DB instance is deleted.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-deleteautomatedbackups
     */
    readonly deleteAutomatedBackups?: boolean | cdk.IResolvable;

    /**
     * A value that indicates whether the DB instance has deletion protection enabled. The database can't be deleted when deletion protection is enabled. By default, deletion protection is disabled. For more information, see [Deleting a DB Instance](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_DeleteInstance.html) .
     *
     * *Amazon Aurora*
     *
     * Not applicable. You can enable or disable deletion protection for the DB cluster. For more information, see `CreateDBCluster` . DB instances in a DB cluster can be deleted even when deletion protection is enabled for the DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-deletionprotection
     */
    readonly deletionProtection?: boolean | cdk.IResolvable;

    /**
     * The Active Directory directory ID to create the DB instance in. Currently, only Microsoft SQL Server, Oracle, and PostgreSQL DB instances can be created in an Active Directory Domain.
     *
     * For more information, see [Kerberos Authentication](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/kerberos-authentication.html) in the *Amazon RDS User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-domain
     */
    readonly domain?: string;

    /**
     * Specify the name of the IAM role to be used when making API calls to the Directory Service.
     *
     * This setting doesn't apply to RDS Custom.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-domainiamrolename
     */
    readonly domainIamRoleName?: string;

    /**
     * The list of log types that need to be enabled for exporting to CloudWatch Logs. The values in the list depend on the DB engine being used. For more information, see [Publishing Database Logs to Amazon CloudWatch Logs](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.html#USER_LogAccess.Procedural.UploadtoCloudWatch) in the *Amazon Relational Database Service User Guide* .
     *
     * *Amazon Aurora*
     *
     * Not applicable. CloudWatch Logs exports are managed by the DB cluster.
     *
     * *MariaDB*
     *
     * Valid values: `audit` , `error` , `general` , `slowquery`
     *
     * *Microsoft SQL Server*
     *
     * Valid values: `agent` , `error`
     *
     * *MySQL*
     *
     * Valid values: `audit` , `error` , `general` , `slowquery`
     *
     * *Oracle*
     *
     * Valid values: `alert` , `audit` , `listener` , `trace`
     *
     * *PostgreSQL*
     *
     * Valid values: `postgresql` , `upgrade`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-enablecloudwatchlogsexports
     */
    readonly enableCloudwatchLogsExports?: string[];

    /**
     * A value that indicates whether to enable mapping of AWS Identity and Access Management (IAM) accounts to database accounts. By default, mapping is disabled.
     *
     * For more information, see [IAM Database Authentication for MySQL and PostgreSQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html) in the *Amazon RDS User Guide.*
     *
     * *Amazon Aurora*
     *
     * Not applicable. Mapping AWS IAM accounts to database accounts is managed by the DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-enableiamdatabaseauthentication
     */
    readonly enableIamDatabaseAuthentication?: boolean | cdk.IResolvable;

    /**
     * A value that indicates whether to enable Performance Insights for the DB instance. For more information, see [Using Amazon Performance Insights](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PerfInsights.html) in the *Amazon RDS User Guide* .
     *
     * This setting doesn't apply to RDS Custom.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-enableperformanceinsights
     */
    readonly enablePerformanceInsights?: boolean | cdk.IResolvable;

    /**
     * The name of the database engine that you want to use for this DB instance.
     *
     * > When you are creating a DB instance, the `Engine` property is required.
     *
     * Valid Values:
     *
     * - `aurora` (for MySQL 5.6-compatible Aurora)
     * - `aurora-mysql` (for MySQL 5.7-compatible Aurora)
     * - `aurora-postgresql`
     * - `mariadb`
     * - `mysql`
     * - `oracle-ee`
     * - `oracle-se2`
     * - `oracle-se1`
     * - `oracle-se`
     * - `postgres`
     * - `sqlserver-ee`
     * - `sqlserver-se`
     * - `sqlserver-ex`
     * - `sqlserver-web`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-engine
     */
    readonly engine?: string;

    /**
     * The version number of the database engine to use.
     *
     * For a list of valid engine versions, use the `DescribeDBEngineVersions` action.
     *
     * The following are the database engines and links to information about the major and minor versions that are available with Amazon RDS. Not every database engine is available for every AWS Region.
     *
     * *Amazon Aurora*
     *
     * Not applicable. The version number of the database engine to be used by the DB instance is managed by the DB cluster.
     *
     * *MariaDB*
     *
     * See [MariaDB on Amazon RDS Versions](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_MariaDB.html#MariaDB.Concepts.VersionMgmt) in the *Amazon RDS User Guide.*
     *
     * *Microsoft SQL Server*
     *
     * See [Microsoft SQL Server Versions on Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SQLServer.html#SQLServer.Concepts.General.VersionSupport) in the *Amazon RDS User Guide.*
     *
     * *MySQL*
     *
     * See [MySQL on Amazon RDS Versions](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_MySQL.html#MySQL.Concepts.VersionMgmt) in the *Amazon RDS User Guide.*
     *
     * *Oracle*
     *
     * See [Oracle Database Engine Release Notes](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.Oracle.PatchComposition.html) in the *Amazon RDS User Guide.*
     *
     * *PostgreSQL*
     *
     * See [Supported PostgreSQL Database Versions](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html#PostgreSQL.Concepts.General.DBVersions) in the *Amazon RDS User Guide.*
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-engineversion
     */
    readonly engineVersion?: string;

    /**
     * The number of I/O operations per second (IOPS) that the database provisions. The value must be equal to or greater than 1000.
     *
     * If you specify this property, you must follow the range of allowed ratios of your requested IOPS rate to the amount of storage that you allocate (IOPS to allocated storage). For example, you can provision an Oracle database instance with 1000 IOPS and 200 GiB of storage (a ratio of 5:1), or specify 2000 IOPS with 200 GiB of storage (a ratio of 10:1). For more information, see [Amazon RDS Provisioned IOPS Storage to Improve Performance](https://docs.aws.amazon.com/AmazonRDS/latest/DeveloperGuide/CHAP_Storage.html#USER_PIOPS) in the *Amazon RDS User Guide* .
     *
     * > If you specify `io1` for the `StorageType` property, then you must also specify the `Iops` property.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-iops
     */
    readonly iops?: number;

    /**
     * The ARN of the AWS KMS key that's used to encrypt the DB instance, such as `arn:aws:kms:us-east-1:012345678910:key/abcd1234-a123-456a-a12b-a123b4cd56ef` . If you enable the StorageEncrypted property but don't specify this property, AWS CloudFormation uses the default KMS key. If you specify this property, you must set the StorageEncrypted property to true.
     *
     * If you specify the `SourceDBInstanceIdentifier` property, the value is inherited from the source DB instance if the read replica is created in the same region.
     *
     * If you create an encrypted read replica in a different AWS Region, then you must specify a KMS key for the destination AWS Region. KMS encryption keys are specific to the region that they're created in, and you can't use encryption keys from one region in another region.
     *
     * If you specify the `SnapshotIdentifier` property, the `StorageEncrypted` property value is inherited from the snapshot, and if the DB instance is encrypted, the specified `KmsKeyId` property is used.
     *
     * If you specify `DBSecurityGroups` , AWS CloudFormation ignores this property. To specify both a security group and this property, you must use a VPC security group. For more information about Amazon RDS and VPC, see [Using Amazon RDS with Amazon VPC](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html) in the *Amazon RDS User Guide* .
     *
     * *Amazon Aurora*
     *
     * Not applicable. The KMS key identifier is managed by the DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-kmskeyid
     */
    readonly kmsKeyId?: string;

    /**
     * License model information for this DB instance.
     *
     * Valid values:
     *
     * - Aurora MySQL - `general-public-license`
     * - Aurora PostgreSQL - `postgresql-license`
     * - MariaDB - `general-public-license`
     * - Microsoft SQL Server - `license-included`
     * - MySQL - `general-public-license`
     * - Oracle - `bring-your-own-license` or `license-included`
     * - PostgreSQL - `postgresql-license`
     *
     * > If you've specified `DBSecurityGroups` and then you update the license model, AWS CloudFormation replaces the underlying DB instance. This will incur some interruptions to database availability.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-licensemodel
     */
    readonly licenseModel?: string;

    /**
     * The master user name for the DB instance.
     *
     * > If you specify the `SourceDBInstanceIdentifier` or `DBSnapshotIdentifier` property, don't specify this property. The value is inherited from the source DB instance or snapshot.
     *
     * *Amazon Aurora*
     *
     * Not applicable. The name for the master user is managed by the DB cluster.
     *
     * *MariaDB*
     *
     * Constraints:
     *
     * - Required for MariaDB.
     * - Must be 1 to 16 letters or numbers.
     * - Can't be a reserved word for the chosen database engine.
     *
     * *Microsoft SQL Server*
     *
     * Constraints:
     *
     * - Required for SQL Server.
     * - Must be 1 to 128 letters or numbers.
     * - The first character must be a letter.
     * - Can't be a reserved word for the chosen database engine.
     *
     * *MySQL*
     *
     * Constraints:
     *
     * - Required for MySQL.
     * - Must be 1 to 16 letters or numbers.
     * - First character must be a letter.
     * - Can't be a reserved word for the chosen database engine.
     *
     * *Oracle*
     *
     * Constraints:
     *
     * - Required for Oracle.
     * - Must be 1 to 30 letters or numbers.
     * - First character must be a letter.
     * - Can't be a reserved word for the chosen database engine.
     *
     * *PostgreSQL*
     *
     * Constraints:
     *
     * - Required for PostgreSQL.
     * - Must be 1 to 63 letters or numbers.
     * - First character must be a letter.
     * - Can't be a reserved word for the chosen database engine.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-masterusername
     */
    readonly masterUsername?: string;

    /**
     * The password for the master user. The password can include any printable ASCII character except "/", """, or "@".
     *
     * *Amazon Aurora*
     *
     * Not applicable. The password for the master user is managed by the DB cluster.
     *
     * *MariaDB*
     *
     * Constraints: Must contain from 8 to 41 characters.
     *
     * *Microsoft SQL Server*
     *
     * Constraints: Must contain from 8 to 128 characters.
     *
     * *MySQL*
     *
     * Constraints: Must contain from 8 to 41 characters.
     *
     * *Oracle*
     *
     * Constraints: Must contain from 8 to 30 characters.
     *
     * *PostgreSQL*
     *
     * Constraints: Must contain from 8 to 128 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-masteruserpassword
     */
    readonly masterUserPassword?: string;

    /**
     * The upper limit in gibibytes (GiB) to which Amazon RDS can automatically scale the storage of the DB instance.
     *
     * For more information about this setting, including limitations that apply to it, see [Managing capacity automatically with Amazon RDS storage autoscaling](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.StorageTypes.html#USER_PIOPS.Autoscaling) in the *Amazon RDS User Guide* .
     *
     * This setting doesn't apply to RDS Custom.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-maxallocatedstorage
     */
    readonly maxAllocatedStorage?: number;

    /**
     * The interval, in seconds, between points when Enhanced Monitoring metrics are collected for the DB instance. To disable collection of Enhanced Monitoring metrics, specify 0. The default is 0.
     *
     * If `MonitoringRoleArn` is specified, then you must set `MonitoringInterval` to a value other than 0.
     *
     * This setting doesn't apply to RDS Custom.
     *
     * Valid Values: `0, 1, 5, 10, 15, 30, 60`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-monitoringinterval
     */
    readonly monitoringInterval?: number;

    /**
     * The ARN for the IAM role that permits RDS to send enhanced monitoring metrics to Amazon CloudWatch Logs. For example, `arn:aws:iam:123456789012:role/emaccess` . For information on creating a monitoring role, see [Setting Up and Enabling Enhanced Monitoring](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.html#USER_Monitoring.OS.Enabling) in the *Amazon RDS User Guide* .
     *
     * If `MonitoringInterval` is set to a value other than 0, then you must supply a `MonitoringRoleArn` value.
     *
     * This setting doesn't apply to RDS Custom.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-monitoringrolearn
     */
    readonly monitoringRoleArn?: string;

    /**
     * Specifies whether the database instance is a Multi-AZ DB instance deployment. You can't set the `AvailabilityZone` parameter if the `MultiAZ` parameter is set to true.
     *
     * Currently, you can't use AWS CloudFormation to create a Multi-AZ DB cluster deployment.
     *
     * For more information, see [Multi-AZ deployments for high availability](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html) in the *Amazon RDS User Guide* .
     *
     * *Amazon Aurora*
     *
     * Not applicable. Amazon Aurora storage is replicated across all of the Availability Zones and doesn't require the `MultiAZ` option to be set.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-multiaz
     */
    readonly multiAz?: boolean | cdk.IResolvable;

    /**
     * Indicates that the DB instance should be associated with the specified option group.
     *
     * Permanent options, such as the TDE option for Oracle Advanced Security TDE, can't be removed from an option group. Also, that option group can't be removed from a DB instance once it is associated with a DB instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-optiongroupname
     */
    readonly optionGroupName?: string;

    /**
     * The AWS KMS key identifier for encryption of Performance Insights data.
     *
     * The KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key.
     *
     * If you do not specify a value for `PerformanceInsightsKMSKeyId` , then Amazon RDS uses your default KMS key. There is a default KMS key for your AWS account. Your AWS account has a different default KMS key for each AWS Region.
     *
     * For information about enabling Performance Insights, see [EnablePerformanceInsights](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-enableperformanceinsights) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-performanceinsightskmskeyid
     */
    readonly performanceInsightsKmsKeyId?: string;

    /**
     * The amount of time, in days, to retain Performance Insights data. Valid values are 7 or 731 (2 years).
     *
     * For information about enabling Performance Insights, see [EnablePerformanceInsights](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-enableperformanceinsights) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-performanceinsightsretentionperiod
     */
    readonly performanceInsightsRetentionPeriod?: number;

    /**
     * The port number on which the database accepts connections.
     *
     * *Amazon Aurora*
     *
     * Not applicable. The port number is managed by the DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-port
     */
    readonly port?: string;

    /**
     * The daily time range during which automated backups are created if automated backups are enabled, using the `BackupRetentionPeriod` parameter. For more information, see [Backup Window](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html#USER_WorkingWithAutomatedBackups.BackupWindow) in the *Amazon RDS User Guide.*
     *
     * Constraints:
     *
     * - Must be in the format `hh24:mi-hh24:mi` .
     * - Must be in Universal Coordinated Time (UTC).
     * - Must not conflict with the preferred maintenance window.
     * - Must be at least 30 minutes.
     *
     * *Amazon Aurora*
     *
     * Not applicable. The daily time range for creating automated backups is managed by the DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-preferredbackupwindow
     */
    readonly preferredBackupWindow?: string;

    /**
     * The weekly time range during which system maintenance can occur, in Universal Coordinated Time (UTC).
     *
     * Format: `ddd:hh24:mi-ddd:hh24:mi`
     *
     * The default is a 30-minute window selected at random from an 8-hour block of time for each AWS Region, occurring on a random day of the week. To see the time blocks available, see [Adjusting the Preferred DB Instance Maintenance Window](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Maintenance.html#AdjustingTheMaintenanceWindow) in the *Amazon RDS User Guide.*
     *
     * > This property applies when AWS CloudFormation initially creates the DB instance. If you use AWS CloudFormation to update the DB instance, those updates are applied immediately.
     *
     * Constraints: Minimum 30-minute window.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-preferredmaintenancewindow
     */
    readonly preferredMaintenanceWindow?: string;

    /**
     * The number of CPU cores and the number of threads per core for the DB instance class of the DB instance.
     *
     * This setting doesn't apply to RDS Custom.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-processorfeatures
     */
    readonly processorFeatures?: Array<CfnDBInstance.ProcessorFeatureProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * A value that specifies the order in which an Aurora Replica is promoted to the primary instance after a failure of the existing primary instance. For more information, see [Fault Tolerance for an Aurora DB Cluster](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Backups.html#Aurora.Managing.FaultTolerance) in the *Amazon Aurora User Guide* .
     *
     * This setting doesn't apply to RDS Custom.
     *
     * Default: 1
     *
     * Valid Values: 0 - 15
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-promotiontier
     */
    readonly promotionTier?: number;

    /**
     * Indicates whether the DB instance is an internet-facing instance. If you specify `true` , AWS CloudFormation creates an instance with a publicly resolvable DNS name, which resolves to a public IP address. If you specify false, AWS CloudFormation creates an internal instance with a DNS name that resolves to a private IP address.
     *
     * The default behavior value depends on your VPC setup and the database subnet group. For more information, see the `PubliclyAccessible` parameter in [`CreateDBInstance`](https://docs.aws.amazon.com/AmazonRDS/latest/APIReference/API_CreateDBInstance.html) in the *Amazon RDS API Reference* .
     *
     * If this resource has a public IP address and is also in a VPC that is defined in the same template, you must use the *DependsOn* attribute to declare a dependency on the VPC-gateway attachment. For more information, see [DependsOn Attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html) .
     *
     * > If you specify DBSecurityGroups, AWS CloudFormation ignores this property. To specify a security group and this property, you must use a VPC security group. For more information about Amazon RDS and VPC, see [Using Amazon RDS with Amazon VPC](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.html) in the *Amazon RDS User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-publiclyaccessible
     */
    readonly publiclyAccessible?: boolean | cdk.IResolvable;

    /**
     * If you want to create a read replica DB instance, specify the ID of the source DB instance. Each DB instance can have a limited number of read replicas. For more information, see [Working with Read Replicas](https://docs.aws.amazon.com/AmazonRDS/latest/DeveloperGuide/USER_ReadRepl.html) in the *Amazon RDS User Guide* .
     *
     * For information about constraints that apply to DB instance identifiers, see [Naming constraints in Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Limits.html#RDS_Limits.Constraints) in the *Amazon RDS User Guide* .
     *
     * The `SourceDBInstanceIdentifier` property determines whether a DB instance is a read replica. If you remove the `SourceDBInstanceIdentifier` property from your template and then update your stack, AWS CloudFormation deletes the Read Replica and creates a new DB instance (not a read replica).
     *
     * > - If you specify a source DB instance that uses VPC security groups, we recommend that you specify the `VPCSecurityGroups` property. If you don't specify the property, the read replica inherits the value of the `VPCSecurityGroups` property from the source DB when you create the replica. However, if you update the stack, AWS CloudFormation reverts the replica's `VPCSecurityGroups` property to the default value because it's not defined in the stack's template. This change might cause unexpected issues.
     * > - Read replicas don't support deletion policies. AWS CloudFormation ignores any deletion policy that's associated with a read replica.
     * > - If you specify `SourceDBInstanceIdentifier` , don't specify the `DBSnapshotIdentifier` property. You can't create a read replica from a snapshot.
     * > - Don't set the `BackupRetentionPeriod` , `DBName` , `MasterUsername` , `MasterUserPassword` , and `PreferredBackupWindow` properties. The database attributes are inherited from the source DB instance, and backups are disabled for read replicas.
     * > - If the source DB instance is in a different region than the read replica, specify the source region in `SourceRegion` , and specify an ARN for a valid DB instance in `SourceDBInstanceIdentifier` . For more information, see [Constructing a Amazon RDS Amazon Resource Name (ARN)](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Tagging.html#USER_Tagging.ARN) in the *Amazon RDS User Guide* .
     * > - For DB instances in Amazon Aurora clusters, don't specify this property. Amazon RDS automatically assigns writer and reader DB instances.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-sourcedbinstanceidentifier
     */
    readonly sourceDbInstanceIdentifier?: string;

    /**
     * The ID of the region that contains the source DB instance for the read replica.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-sourceregion
     */
    readonly sourceRegion?: string;

    /**
     * A value that indicates whether the DB instance is encrypted. By default, it isn't encrypted.
     *
     * If you specify the `KmsKeyId` property, then you must enable encryption.
     *
     * If you specify the `SnapshotIdentifier` or `SourceDBInstanceIdentifier` property, don't specify this property. The value is inherited from the snapshot or source DB instance, and if the DB instance is encrypted, the specified `KmsKeyId` property is used.
     *
     * *Amazon Aurora*
     *
     * Not applicable. The encryption for DB instances is managed by the DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-storageencrypted
     */
    readonly storageEncrypted?: boolean | cdk.IResolvable;

    /**
     * Specifies the storage type to be associated with the DB instance.
     *
     * Valid values: `standard | gp2 | io1`
     *
     * The `standard` value is also known as magnetic.
     *
     * If you specify `io1` , you must also include a value for the `Iops` parameter.
     *
     * Default: `io1` if the `Iops` parameter is specified, otherwise `standard`
     *
     * For more information, see [Amazon RDS DB Instance Storage](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Storage.html) in the *Amazon RDS User Guide* .
     *
     * *Amazon Aurora*
     *
     * Not applicable. Aurora data is stored in the cluster volume, which is a single, virtual volume that uses solid state drives (SSDs).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-storagetype
     */
    readonly storageType?: string;

    /**
     * Tags to assign to the DB instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-tags
     */
    readonly tags?: cdk.CfnTag[];

    /**
     * The time zone of the DB instance. The time zone parameter is currently supported only by [Microsoft SQL Server](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SQLServer.html#SQLServer.Concepts.General.TimeZone) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-timezone
     */
    readonly timezone?: string;

    /**
     * A value that indicates whether the DB instance class of the DB instance uses its default processor features.
     *
     * This setting doesn't apply to RDS Custom.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-usedefaultprocessorfeatures
     */
    readonly useDefaultProcessorFeatures?: boolean | cdk.IResolvable;

    /**
     * A list of the VPC security group IDs to assign to the DB instance. The list can include both the physical IDs of existing VPC security groups and references to [AWS::EC2::SecurityGroup](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-security-group.html) resources created in the template.
     *
     * If you plan to update the resource, don't specify VPC security groups in a shared VPC.
     *
     * If you set `VPCSecurityGroups` , you must not set [`DBSecurityGroups`](https://docs.aws.amazon.com//AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbsecuritygroups) , and vice versa.
     *
     * > You can migrate a DB instance in your stack from an RDS DB security group to a VPC security group, but keep the following in mind:
     * >
     * > - You can't revert to using an RDS security group after you establish a VPC security group membership.
     * > - When you migrate your DB instance to VPC security groups, if your stack update rolls back because the DB instance update fails or because an update fails in another AWS CloudFormation resource, the rollback fails because it can't revert to an RDS security group.
     * > - To use the properties that are available when you use a VPC security group, you must recreate the DB instance. If you don't, AWS CloudFormation submits only the property values that are listed in the [`DBSecurityGroups`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbsecuritygroups) property.
     *
     * To avoid this situation, migrate your DB instance to using VPC security groups only when that is the only change in your stack template.
     *
     * *Amazon Aurora*
     *
     * Not applicable. The associated list of EC2 VPC security groups is managed by the DB cluster. If specified, the setting must match the DB cluster setting.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-vpcsecuritygroups
     */
    readonly vpcSecurityGroups?: string[];
}

/**
 * Determine whether the given properties match those of a `CfnDBInstanceProps`
 *
 * @param properties - the TypeScript properties of a `CfnDBInstanceProps`
 *
 * @returns the result of the validation.
 */
function CfnDBInstancePropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('allocatedStorage', cdk.validateString)(properties.allocatedStorage));
    errors.collect(cdk.propertyValidator('allowMajorVersionUpgrade', cdk.validateBoolean)(properties.allowMajorVersionUpgrade));
    errors.collect(cdk.propertyValidator('associatedRoles', cdk.listValidator(CfnDBInstance_DBInstanceRolePropertyValidator))(properties.associatedRoles));
    errors.collect(cdk.propertyValidator('autoMinorVersionUpgrade', cdk.validateBoolean)(properties.autoMinorVersionUpgrade));
    errors.collect(cdk.propertyValidator('availabilityZone', cdk.validateString)(properties.availabilityZone));
    errors.collect(cdk.propertyValidator('backupRetentionPeriod', cdk.validateNumber)(properties.backupRetentionPeriod));
    errors.collect(cdk.propertyValidator('caCertificateIdentifier', cdk.validateString)(properties.caCertificateIdentifier));
    errors.collect(cdk.propertyValidator('characterSetName', cdk.validateString)(properties.characterSetName));
    errors.collect(cdk.propertyValidator('copyTagsToSnapshot', cdk.validateBoolean)(properties.copyTagsToSnapshot));
    errors.collect(cdk.propertyValidator('dbClusterIdentifier', cdk.validateString)(properties.dbClusterIdentifier));
    errors.collect(cdk.propertyValidator('dbInstanceClass', cdk.requiredValidator)(properties.dbInstanceClass));
    errors.collect(cdk.propertyValidator('dbInstanceClass', cdk.validateString)(properties.dbInstanceClass));
    errors.collect(cdk.propertyValidator('dbInstanceIdentifier', cdk.validateString)(properties.dbInstanceIdentifier));
    errors.collect(cdk.propertyValidator('dbName', cdk.validateString)(properties.dbName));
    errors.collect(cdk.propertyValidator('dbParameterGroupName', cdk.validateString)(properties.dbParameterGroupName));
    errors.collect(cdk.propertyValidator('dbSecurityGroups', cdk.listValidator(cdk.validateString))(properties.dbSecurityGroups));
    errors.collect(cdk.propertyValidator('dbSnapshotIdentifier', cdk.validateString)(properties.dbSnapshotIdentifier));
    errors.collect(cdk.propertyValidator('dbSubnetGroupName', cdk.validateString)(properties.dbSubnetGroupName));
    errors.collect(cdk.propertyValidator('deleteAutomatedBackups', cdk.validateBoolean)(properties.deleteAutomatedBackups));
    errors.collect(cdk.propertyValidator('deletionProtection', cdk.validateBoolean)(properties.deletionProtection));
    errors.collect(cdk.propertyValidator('domain', cdk.validateString)(properties.domain));
    errors.collect(cdk.propertyValidator('domainIamRoleName', cdk.validateString)(properties.domainIamRoleName));
    errors.collect(cdk.propertyValidator('enableCloudwatchLogsExports', cdk.listValidator(cdk.validateString))(properties.enableCloudwatchLogsExports));
    errors.collect(cdk.propertyValidator('enableIamDatabaseAuthentication', cdk.validateBoolean)(properties.enableIamDatabaseAuthentication));
    errors.collect(cdk.propertyValidator('enablePerformanceInsights', cdk.validateBoolean)(properties.enablePerformanceInsights));
    errors.collect(cdk.propertyValidator('engine', cdk.validateString)(properties.engine));
    errors.collect(cdk.propertyValidator('engineVersion', cdk.validateString)(properties.engineVersion));
    errors.collect(cdk.propertyValidator('iops', cdk.validateNumber)(properties.iops));
    errors.collect(cdk.propertyValidator('kmsKeyId', cdk.validateString)(properties.kmsKeyId));
    errors.collect(cdk.propertyValidator('licenseModel', cdk.validateString)(properties.licenseModel));
    errors.collect(cdk.propertyValidator('masterUserPassword', cdk.validateString)(properties.masterUserPassword));
    errors.collect(cdk.propertyValidator('masterUsername', cdk.validateString)(properties.masterUsername));
    errors.collect(cdk.propertyValidator('maxAllocatedStorage', cdk.validateNumber)(properties.maxAllocatedStorage));
    errors.collect(cdk.propertyValidator('monitoringInterval', cdk.validateNumber)(properties.monitoringInterval));
    errors.collect(cdk.propertyValidator('monitoringRoleArn', cdk.validateString)(properties.monitoringRoleArn));
    errors.collect(cdk.propertyValidator('multiAz', cdk.validateBoolean)(properties.multiAz));
    errors.collect(cdk.propertyValidator('optionGroupName', cdk.validateString)(properties.optionGroupName));
    errors.collect(cdk.propertyValidator('performanceInsightsKmsKeyId', cdk.validateString)(properties.performanceInsightsKmsKeyId));
    errors.collect(cdk.propertyValidator('performanceInsightsRetentionPeriod', cdk.validateNumber)(properties.performanceInsightsRetentionPeriod));
    errors.collect(cdk.propertyValidator('port', cdk.validateString)(properties.port));
    errors.collect(cdk.propertyValidator('preferredBackupWindow', cdk.validateString)(properties.preferredBackupWindow));
    errors.collect(cdk.propertyValidator('preferredMaintenanceWindow', cdk.validateString)(properties.preferredMaintenanceWindow));
    errors.collect(cdk.propertyValidator('processorFeatures', cdk.listValidator(CfnDBInstance_ProcessorFeaturePropertyValidator))(properties.processorFeatures));
    errors.collect(cdk.propertyValidator('promotionTier', cdk.validateNumber)(properties.promotionTier));
    errors.collect(cdk.propertyValidator('publiclyAccessible', cdk.validateBoolean)(properties.publiclyAccessible));
    errors.collect(cdk.propertyValidator('sourceDbInstanceIdentifier', cdk.validateString)(properties.sourceDbInstanceIdentifier));
    errors.collect(cdk.propertyValidator('sourceRegion', cdk.validateString)(properties.sourceRegion));
    errors.collect(cdk.propertyValidator('storageEncrypted', cdk.validateBoolean)(properties.storageEncrypted));
    errors.collect(cdk.propertyValidator('storageType', cdk.validateString)(properties.storageType));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    errors.collect(cdk.propertyValidator('timezone', cdk.validateString)(properties.timezone));
    errors.collect(cdk.propertyValidator('useDefaultProcessorFeatures', cdk.validateBoolean)(properties.useDefaultProcessorFeatures));
    errors.collect(cdk.propertyValidator('vpcSecurityGroups', cdk.listValidator(cdk.validateString))(properties.vpcSecurityGroups));
    return errors.wrap('supplied properties not correct for "CfnDBInstanceProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::DBInstance` resource
 *
 * @param properties - the TypeScript properties of a `CfnDBInstanceProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::DBInstance` resource.
 */
// @ts-ignore TS6133
function cfnDBInstancePropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDBInstancePropsValidator(properties).assertSuccess();
    return {
        DBInstanceClass: cdk.stringToCloudFormation(properties.dbInstanceClass),
        AllocatedStorage: cdk.stringToCloudFormation(properties.allocatedStorage),
        AllowMajorVersionUpgrade: cdk.booleanToCloudFormation(properties.allowMajorVersionUpgrade),
        AssociatedRoles: cdk.listMapper(cfnDBInstanceDBInstanceRolePropertyToCloudFormation)(properties.associatedRoles),
        AutoMinorVersionUpgrade: cdk.booleanToCloudFormation(properties.autoMinorVersionUpgrade),
        AvailabilityZone: cdk.stringToCloudFormation(properties.availabilityZone),
        BackupRetentionPeriod: cdk.numberToCloudFormation(properties.backupRetentionPeriod),
        CACertificateIdentifier: cdk.stringToCloudFormation(properties.caCertificateIdentifier),
        CharacterSetName: cdk.stringToCloudFormation(properties.characterSetName),
        CopyTagsToSnapshot: cdk.booleanToCloudFormation(properties.copyTagsToSnapshot),
        DBClusterIdentifier: cdk.stringToCloudFormation(properties.dbClusterIdentifier),
        DBInstanceIdentifier: cdk.stringToCloudFormation(properties.dbInstanceIdentifier),
        DBName: cdk.stringToCloudFormation(properties.dbName),
        DBParameterGroupName: cdk.stringToCloudFormation(properties.dbParameterGroupName),
        DBSecurityGroups: cdk.listMapper(cdk.stringToCloudFormation)(properties.dbSecurityGroups),
        DBSnapshotIdentifier: cdk.stringToCloudFormation(properties.dbSnapshotIdentifier),
        DBSubnetGroupName: cdk.stringToCloudFormation(properties.dbSubnetGroupName),
        DeleteAutomatedBackups: cdk.booleanToCloudFormation(properties.deleteAutomatedBackups),
        DeletionProtection: cdk.booleanToCloudFormation(properties.deletionProtection),
        Domain: cdk.stringToCloudFormation(properties.domain),
        DomainIAMRoleName: cdk.stringToCloudFormation(properties.domainIamRoleName),
        EnableCloudwatchLogsExports: cdk.listMapper(cdk.stringToCloudFormation)(properties.enableCloudwatchLogsExports),
        EnableIAMDatabaseAuthentication: cdk.booleanToCloudFormation(properties.enableIamDatabaseAuthentication),
        EnablePerformanceInsights: cdk.booleanToCloudFormation(properties.enablePerformanceInsights),
        Engine: cdk.stringToCloudFormation(properties.engine),
        EngineVersion: cdk.stringToCloudFormation(properties.engineVersion),
        Iops: cdk.numberToCloudFormation(properties.iops),
        KmsKeyId: cdk.stringToCloudFormation(properties.kmsKeyId),
        LicenseModel: cdk.stringToCloudFormation(properties.licenseModel),
        MasterUsername: cdk.stringToCloudFormation(properties.masterUsername),
        MasterUserPassword: cdk.stringToCloudFormation(properties.masterUserPassword),
        MaxAllocatedStorage: cdk.numberToCloudFormation(properties.maxAllocatedStorage),
        MonitoringInterval: cdk.numberToCloudFormation(properties.monitoringInterval),
        MonitoringRoleArn: cdk.stringToCloudFormation(properties.monitoringRoleArn),
        MultiAZ: cdk.booleanToCloudFormation(properties.multiAz),
        OptionGroupName: cdk.stringToCloudFormation(properties.optionGroupName),
        PerformanceInsightsKMSKeyId: cdk.stringToCloudFormation(properties.performanceInsightsKmsKeyId),
        PerformanceInsightsRetentionPeriod: cdk.numberToCloudFormation(properties.performanceInsightsRetentionPeriod),
        Port: cdk.stringToCloudFormation(properties.port),
        PreferredBackupWindow: cdk.stringToCloudFormation(properties.preferredBackupWindow),
        PreferredMaintenanceWindow: cdk.stringToCloudFormation(properties.preferredMaintenanceWindow),
        ProcessorFeatures: cdk.listMapper(cfnDBInstanceProcessorFeaturePropertyToCloudFormation)(properties.processorFeatures),
        PromotionTier: cdk.numberToCloudFormation(properties.promotionTier),
        PubliclyAccessible: cdk.booleanToCloudFormation(properties.publiclyAccessible),
        SourceDBInstanceIdentifier: cdk.stringToCloudFormation(properties.sourceDbInstanceIdentifier),
        SourceRegion: cdk.stringToCloudFormation(properties.sourceRegion),
        StorageEncrypted: cdk.booleanToCloudFormation(properties.storageEncrypted),
        StorageType: cdk.stringToCloudFormation(properties.storageType),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
        Timezone: cdk.stringToCloudFormation(properties.timezone),
        UseDefaultProcessorFeatures: cdk.booleanToCloudFormation(properties.useDefaultProcessorFeatures),
        VPCSecurityGroups: cdk.listMapper(cdk.stringToCloudFormation)(properties.vpcSecurityGroups),
    };
}

// @ts-ignore TS6133
function CfnDBInstancePropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDBInstanceProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDBInstanceProps>();
    ret.addPropertyResult('dbInstanceClass', 'DBInstanceClass', cfn_parse.FromCloudFormation.getString(properties.DBInstanceClass));
    ret.addPropertyResult('allocatedStorage', 'AllocatedStorage', properties.AllocatedStorage != null ? cfn_parse.FromCloudFormation.getString(properties.AllocatedStorage) : undefined);
    ret.addPropertyResult('allowMajorVersionUpgrade', 'AllowMajorVersionUpgrade', properties.AllowMajorVersionUpgrade != null ? cfn_parse.FromCloudFormation.getBoolean(properties.AllowMajorVersionUpgrade) : undefined);
    ret.addPropertyResult('associatedRoles', 'AssociatedRoles', properties.AssociatedRoles != null ? cfn_parse.FromCloudFormation.getArray(CfnDBInstanceDBInstanceRolePropertyFromCloudFormation)(properties.AssociatedRoles) : undefined);
    ret.addPropertyResult('autoMinorVersionUpgrade', 'AutoMinorVersionUpgrade', properties.AutoMinorVersionUpgrade != null ? cfn_parse.FromCloudFormation.getBoolean(properties.AutoMinorVersionUpgrade) : undefined);
    ret.addPropertyResult('availabilityZone', 'AvailabilityZone', properties.AvailabilityZone != null ? cfn_parse.FromCloudFormation.getString(properties.AvailabilityZone) : undefined);
    ret.addPropertyResult('backupRetentionPeriod', 'BackupRetentionPeriod', properties.BackupRetentionPeriod != null ? cfn_parse.FromCloudFormation.getNumber(properties.BackupRetentionPeriod) : undefined);
    ret.addPropertyResult('caCertificateIdentifier', 'CACertificateIdentifier', properties.CACertificateIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.CACertificateIdentifier) : undefined);
    ret.addPropertyResult('characterSetName', 'CharacterSetName', properties.CharacterSetName != null ? cfn_parse.FromCloudFormation.getString(properties.CharacterSetName) : undefined);
    ret.addPropertyResult('copyTagsToSnapshot', 'CopyTagsToSnapshot', properties.CopyTagsToSnapshot != null ? cfn_parse.FromCloudFormation.getBoolean(properties.CopyTagsToSnapshot) : undefined);
    ret.addPropertyResult('dbClusterIdentifier', 'DBClusterIdentifier', properties.DBClusterIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.DBClusterIdentifier) : undefined);
    ret.addPropertyResult('dbInstanceIdentifier', 'DBInstanceIdentifier', properties.DBInstanceIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.DBInstanceIdentifier) : undefined);
    ret.addPropertyResult('dbName', 'DBName', properties.DBName != null ? cfn_parse.FromCloudFormation.getString(properties.DBName) : undefined);
    ret.addPropertyResult('dbParameterGroupName', 'DBParameterGroupName', properties.DBParameterGroupName != null ? cfn_parse.FromCloudFormation.getString(properties.DBParameterGroupName) : undefined);
    ret.addPropertyResult('dbSecurityGroups', 'DBSecurityGroups', properties.DBSecurityGroups != null ? cfn_parse.FromCloudFormation.getStringArray(properties.DBSecurityGroups) : undefined);
    ret.addPropertyResult('dbSnapshotIdentifier', 'DBSnapshotIdentifier', properties.DBSnapshotIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.DBSnapshotIdentifier) : undefined);
    ret.addPropertyResult('dbSubnetGroupName', 'DBSubnetGroupName', properties.DBSubnetGroupName != null ? cfn_parse.FromCloudFormation.getString(properties.DBSubnetGroupName) : undefined);
    ret.addPropertyResult('deleteAutomatedBackups', 'DeleteAutomatedBackups', properties.DeleteAutomatedBackups != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DeleteAutomatedBackups) : undefined);
    ret.addPropertyResult('deletionProtection', 'DeletionProtection', properties.DeletionProtection != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DeletionProtection) : undefined);
    ret.addPropertyResult('domain', 'Domain', properties.Domain != null ? cfn_parse.FromCloudFormation.getString(properties.Domain) : undefined);
    ret.addPropertyResult('domainIamRoleName', 'DomainIAMRoleName', properties.DomainIAMRoleName != null ? cfn_parse.FromCloudFormation.getString(properties.DomainIAMRoleName) : undefined);
    ret.addPropertyResult('enableCloudwatchLogsExports', 'EnableCloudwatchLogsExports', properties.EnableCloudwatchLogsExports != null ? cfn_parse.FromCloudFormation.getStringArray(properties.EnableCloudwatchLogsExports) : undefined);
    ret.addPropertyResult('enableIamDatabaseAuthentication', 'EnableIAMDatabaseAuthentication', properties.EnableIAMDatabaseAuthentication != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnableIAMDatabaseAuthentication) : undefined);
    ret.addPropertyResult('enablePerformanceInsights', 'EnablePerformanceInsights', properties.EnablePerformanceInsights != null ? cfn_parse.FromCloudFormation.getBoolean(properties.EnablePerformanceInsights) : undefined);
    ret.addPropertyResult('engine', 'Engine', properties.Engine != null ? cfn_parse.FromCloudFormation.getString(properties.Engine) : undefined);
    ret.addPropertyResult('engineVersion', 'EngineVersion', properties.EngineVersion != null ? cfn_parse.FromCloudFormation.getString(properties.EngineVersion) : undefined);
    ret.addPropertyResult('iops', 'Iops', properties.Iops != null ? cfn_parse.FromCloudFormation.getNumber(properties.Iops) : undefined);
    ret.addPropertyResult('kmsKeyId', 'KmsKeyId', properties.KmsKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.KmsKeyId) : undefined);
    ret.addPropertyResult('licenseModel', 'LicenseModel', properties.LicenseModel != null ? cfn_parse.FromCloudFormation.getString(properties.LicenseModel) : undefined);
    ret.addPropertyResult('masterUsername', 'MasterUsername', properties.MasterUsername != null ? cfn_parse.FromCloudFormation.getString(properties.MasterUsername) : undefined);
    ret.addPropertyResult('masterUserPassword', 'MasterUserPassword', properties.MasterUserPassword != null ? cfn_parse.FromCloudFormation.getString(properties.MasterUserPassword) : undefined);
    ret.addPropertyResult('maxAllocatedStorage', 'MaxAllocatedStorage', properties.MaxAllocatedStorage != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxAllocatedStorage) : undefined);
    ret.addPropertyResult('monitoringInterval', 'MonitoringInterval', properties.MonitoringInterval != null ? cfn_parse.FromCloudFormation.getNumber(properties.MonitoringInterval) : undefined);
    ret.addPropertyResult('monitoringRoleArn', 'MonitoringRoleArn', properties.MonitoringRoleArn != null ? cfn_parse.FromCloudFormation.getString(properties.MonitoringRoleArn) : undefined);
    ret.addPropertyResult('multiAz', 'MultiAZ', properties.MultiAZ != null ? cfn_parse.FromCloudFormation.getBoolean(properties.MultiAZ) : undefined);
    ret.addPropertyResult('optionGroupName', 'OptionGroupName', properties.OptionGroupName != null ? cfn_parse.FromCloudFormation.getString(properties.OptionGroupName) : undefined);
    ret.addPropertyResult('performanceInsightsKmsKeyId', 'PerformanceInsightsKMSKeyId', properties.PerformanceInsightsKMSKeyId != null ? cfn_parse.FromCloudFormation.getString(properties.PerformanceInsightsKMSKeyId) : undefined);
    ret.addPropertyResult('performanceInsightsRetentionPeriod', 'PerformanceInsightsRetentionPeriod', properties.PerformanceInsightsRetentionPeriod != null ? cfn_parse.FromCloudFormation.getNumber(properties.PerformanceInsightsRetentionPeriod) : undefined);
    ret.addPropertyResult('port', 'Port', properties.Port != null ? cfn_parse.FromCloudFormation.getString(properties.Port) : undefined);
    ret.addPropertyResult('preferredBackupWindow', 'PreferredBackupWindow', properties.PreferredBackupWindow != null ? cfn_parse.FromCloudFormation.getString(properties.PreferredBackupWindow) : undefined);
    ret.addPropertyResult('preferredMaintenanceWindow', 'PreferredMaintenanceWindow', properties.PreferredMaintenanceWindow != null ? cfn_parse.FromCloudFormation.getString(properties.PreferredMaintenanceWindow) : undefined);
    ret.addPropertyResult('processorFeatures', 'ProcessorFeatures', properties.ProcessorFeatures != null ? cfn_parse.FromCloudFormation.getArray(CfnDBInstanceProcessorFeaturePropertyFromCloudFormation)(properties.ProcessorFeatures) : undefined);
    ret.addPropertyResult('promotionTier', 'PromotionTier', properties.PromotionTier != null ? cfn_parse.FromCloudFormation.getNumber(properties.PromotionTier) : undefined);
    ret.addPropertyResult('publiclyAccessible', 'PubliclyAccessible', properties.PubliclyAccessible != null ? cfn_parse.FromCloudFormation.getBoolean(properties.PubliclyAccessible) : undefined);
    ret.addPropertyResult('sourceDbInstanceIdentifier', 'SourceDBInstanceIdentifier', properties.SourceDBInstanceIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.SourceDBInstanceIdentifier) : undefined);
    ret.addPropertyResult('sourceRegion', 'SourceRegion', properties.SourceRegion != null ? cfn_parse.FromCloudFormation.getString(properties.SourceRegion) : undefined);
    ret.addPropertyResult('storageEncrypted', 'StorageEncrypted', properties.StorageEncrypted != null ? cfn_parse.FromCloudFormation.getBoolean(properties.StorageEncrypted) : undefined);
    ret.addPropertyResult('storageType', 'StorageType', properties.StorageType != null ? cfn_parse.FromCloudFormation.getString(properties.StorageType) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addPropertyResult('timezone', 'Timezone', properties.Timezone != null ? cfn_parse.FromCloudFormation.getString(properties.Timezone) : undefined);
    ret.addPropertyResult('useDefaultProcessorFeatures', 'UseDefaultProcessorFeatures', properties.UseDefaultProcessorFeatures != null ? cfn_parse.FromCloudFormation.getBoolean(properties.UseDefaultProcessorFeatures) : undefined);
    ret.addPropertyResult('vpcSecurityGroups', 'VPCSecurityGroups', properties.VPCSecurityGroups != null ? cfn_parse.FromCloudFormation.getStringArray(properties.VPCSecurityGroups) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::RDS::DBInstance`
 *
 * The `AWS::RDS::DBInstance` resource creates an Amazon RDS DB instance.
 *
 * If you import an existing DB instance, and the template configuration doesn't match the actual configuration of the DB instance, AWS CloudFormation applies the changes in the template during the import operation.
 *
 * > If a DB instance is deleted or replaced during an update, AWS CloudFormation deletes all automated snapshots. However, it retains manual DB snapshots. During an update that requires replacement, you can apply a stack policy to prevent DB instances from being replaced. For more information, see [Prevent Updates to Stack Resources](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/protect-stack-resources.html) .
 *
 * This topic covers the resource for Amazon RDS DB instances. For the documentation on the resource for Amazon Aurora DB clusters, see [AWS::RDS::DBCluster](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html) .
 *
 * *Updating DB instances*
 *
 * When properties labeled " *Update requires:* [Replacement](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-update-behaviors.html#update-replacement) " are updated, AWS CloudFormation first creates a replacement DB instance, then changes references from other dependent resources to point to the replacement DB instance, and finally deletes the old DB instance.
 *
 * > We highly recommend that you take a snapshot of the database before updating the stack. If you don't, you lose the data when AWS CloudFormation replaces your DB instance. To preserve your data, perform the following procedure:
 * >
 * > - Deactivate any applications that are using the DB instance so that there's no activity on the DB instance.
 * > - Create a snapshot of the DB instance. For more information about creating DB snapshots, see [Creating a DB Snapshot](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_CreateSnapshot.html) .
 * > - If you want to restore your instance using a DB snapshot, modify the updated template with your DB instance changes and add the `DBSnapshotIdentifier` property with the ID of the DB snapshot that you want to use.
 * >
 * > After you restore a DB instance with a `DBSnapshotIdentifier` property, you must specify the same `DBSnapshotIdentifier` property for any future updates to the DB instance. When you specify this property for an update, the DB instance is not restored from the DB snapshot again, and the data in the database is not changed. However, if you don't specify the `DBSnapshotIdentifier` property, an empty DB instance is created, and the original DB instance is deleted. If you specify a property that is different from the previous snapshot restore property, a new DB instance is restored from the specified `DBSnapshotIdentifier` property, and the original DB instance is deleted.
 * > - Update the stack.
 *
 * For more information about updating other properties of this resource, see `[ModifyDBInstance](https://docs.aws.amazon.com//AmazonRDS/latest/APIReference/API_ModifyDBInstance.html)` . For more information about updating stacks, see [AWS CloudFormation Stacks Updates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks.html) .
 *
 * *Deleting DB instances*
 *
 * For DB instances that are part of an Aurora DB cluster, you can set a deletion policy for your DB instance to control how AWS CloudFormation handles the DB instance when the stack is deleted. For Amazon RDS DB instances, you can choose to *retain* the DB instance, to *delete* the DB instance, or to *create a snapshot* of the DB instance. The default AWS CloudFormation behavior depends on the `DBClusterIdentifier` property:
 *
 * - For `AWS::RDS::DBInstance` resources that don't specify the `DBClusterIdentifier` property, AWS CloudFormation saves a snapshot of the DB instance.
 * - For `AWS::RDS::DBInstance` resources that do specify the `DBClusterIdentifier` property, AWS CloudFormation deletes the DB instance.
 *
 * For more information, see [DeletionPolicy Attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-deletionpolicy.html) .
 *
 * @cloudformationResource AWS::RDS::DBInstance
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html
 */
export class CfnDBInstance extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::RDS::DBInstance";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDBInstance {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDBInstancePropsFromCloudFormation(resourceProperties);
        const ret = new CfnDBInstance(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The connection endpoint for the database. For example: `mystack-mydb-1apw1j4phylrk.cg034hpkmmjt.us-east-2.rds.amazonaws.com`
     * @cloudformationAttribute Endpoint.Address
     */
    public readonly attrEndpointAddress: string;

    /**
     * The port number on which the database accepts connections. For example: `3306`
     * @cloudformationAttribute Endpoint.Port
     */
    public readonly attrEndpointPort: string;

    /**
     * The compute and memory capacity of the DB instance, for example, `db.m4.large` . Not all DB instance classes are available in all AWS Regions, or for all database engines.
     *
     * For the full list of DB instance classes, and availability for your engine, see [DB Instance Class](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.DBInstanceClass.html) in the *Amazon RDS User Guide.* For more information about DB instance class pricing and AWS Region support for DB instance classes, see [Amazon RDS Pricing](https://docs.aws.amazon.com/rds/pricing/) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbinstanceclass
     */
    public dbInstanceClass: string;

    /**
     * The amount of storage (in gigabytes) to be initially allocated for the database instance.
     *
     * > If any value is set in the `Iops` parameter, `AllocatedStorage` must be at least 100 GiB, which corresponds to the minimum Iops value of 1,000. If you increase the `Iops` value (in 1,000 IOPS increments), then you must also increase the `AllocatedStorage` value (in 100-GiB increments).
     *
     * *Amazon Aurora*
     *
     * Not applicable. Aurora cluster volumes automatically grow as the amount of data in your database increases, though you are only charged for the space that you use in an Aurora cluster volume.
     *
     * *MySQL*
     *
     * Constraints to the amount of storage for each storage type are the following:
     *
     * - General Purpose (SSD) storage (gp2): Must be an integer from 20 to 65536.
     * - Provisioned IOPS storage (io1): Must be an integer from 100 to 65536.
     * - Magnetic storage (standard): Must be an integer from 5 to 3072.
     *
     * *MariaDB*
     *
     * Constraints to the amount of storage for each storage type are the following:
     *
     * - General Purpose (SSD) storage (gp2): Must be an integer from 20 to 65536.
     * - Provisioned IOPS storage (io1): Must be an integer from 100 to 65536.
     * - Magnetic storage (standard): Must be an integer from 5 to 3072.
     *
     * *PostgreSQL*
     *
     * Constraints to the amount of storage for each storage type are the following:
     *
     * - General Purpose (SSD) storage (gp2): Must be an integer from 20 to 65536.
     * - Provisioned IOPS storage (io1): Must be an integer from 100 to 65536.
     * - Magnetic storage (standard): Must be an integer from 5 to 3072.
     *
     * *Oracle*
     *
     * Constraints to the amount of storage for each storage type are the following:
     *
     * - General Purpose (SSD) storage (gp2): Must be an integer from 20 to 65536.
     * - Provisioned IOPS storage (io1): Must be an integer from 100 to 65536.
     * - Magnetic storage (standard): Must be an integer from 10 to 3072.
     *
     * *SQL Server*
     *
     * Constraints to the amount of storage for each storage type are the following:
     *
     * - General Purpose (SSD) storage (gp2):
     *
     * - Enterprise and Standard editions: Must be an integer from 20 to 16384.
     * - Web and Express editions: Must be an integer from 20 to 16384.
     * - Provisioned IOPS storage (io1):
     *
     * - Enterprise and Standard editions: Must be an integer from 20 to 16384.
     * - Web and Express editions: Must be an integer from 20 to 16384.
     * - Magnetic storage (standard):
     *
     * - Enterprise and Standard editions: Must be an integer from 20 to 1024.
     * - Web and Express editions: Must be an integer from 20 to 1024.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-allocatedstorage
     */
    public allocatedStorage: string | undefined;

    /**
     * A value that indicates whether major version upgrades are allowed. Changing this parameter doesn't result in an outage and the change is asynchronously applied as soon as possible.
     *
     * Constraints: Major version upgrades must be allowed when specifying a value for the `EngineVersion` parameter that is a different major version than the DB instance's current version.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-allowmajorversionupgrade
     */
    public allowMajorVersionUpgrade: boolean | cdk.IResolvable | undefined;

    /**
     * The AWS Identity and Access Management (IAM) roles associated with the DB instance.
     *
     * *Amazon Aurora*
     *
     * Not applicable. The associated roles are managed by the DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-associatedroles
     */
    public associatedRoles: Array<CfnDBInstance.DBInstanceRoleProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * A value that indicates whether minor engine upgrades are applied automatically to the DB instance during the maintenance window. By default, minor engine upgrades are applied automatically.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-autominorversionupgrade
     */
    public autoMinorVersionUpgrade: boolean | cdk.IResolvable | undefined;

    /**
     * The Availability Zone (AZ) where the database will be created. For information on AWS Regions and Availability Zones, see [Regions and Availability Zones](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html) .
     *
     * *Amazon Aurora*
     *
     * Each Aurora DB cluster hosts copies of its storage in three separate Availability Zones. Specify one of these Availability Zones. Aurora automatically chooses an appropriate Availability Zone if you don't specify one.
     *
     * Default: A random, system-chosen Availability Zone in the endpoint's AWS Region .
     *
     * Example: `us-east-1d`
     *
     * Constraint: The `AvailabilityZone` parameter can't be specified if the DB instance is a Multi-AZ deployment. The specified Availability Zone must be in the same AWS Region as the current endpoint.
     *
     * > If you're creating a DB instance in an RDS on VMware environment, specify the identifier of the custom Availability Zone to create the DB instance in.
     * >
     * > For more information about RDS on VMware, see the [RDS on VMware User Guide.](https://docs.aws.amazon.com/AmazonRDS/latest/RDSonVMwareUserGuide/rds-on-vmware.html)
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-availabilityzone
     */
    public availabilityZone: string | undefined;

    /**
     * The number of days for which automated backups are retained. Setting this parameter to a positive number enables backups. Setting this parameter to 0 disables automated backups.
     *
     * *Amazon Aurora*
     *
     * Not applicable. The retention period for automated backups is managed by the DB cluster.
     *
     * Default: 1
     *
     * Constraints:
     *
     * - Must be a value from 0 to 35
     * - Can't be set to 0 if the DB instance is a source to read replicas
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-backupretentionperiod
     */
    public backupRetentionPeriod: number | undefined;

    /**
     * The identifier of the CA certificate for this DB instance.
     *
     * > Specifying or updating this property triggers a reboot.
     *
     * For more information about CA certificate identifiers for RDS DB engines, see [Rotating Your SSL/TLS Certificate](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.SSL-certificate-rotation.html) in the *Amazon RDS User Guide* .
     *
     * For more information about CA certificate identifiers for Aurora DB engines, see [Rotating Your SSL/TLS Certificate](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/UsingWithRDS.SSL-certificate-rotation.html) in the *Amazon Aurora User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-cacertificateidentifier
     */
    public caCertificateIdentifier: string | undefined;

    /**
     * For supported engines, indicates that the DB instance should be associated with the specified character set.
     *
     * *Amazon Aurora*
     *
     * Not applicable. The character set is managed by the DB cluster. For more information, see [AWS::RDS::DBCluster](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbcluster.html) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-charactersetname
     */
    public characterSetName: string | undefined;

    /**
     * A value that indicates whether to copy tags from the DB instance to snapshots of the DB instance. By default, tags are not copied.
     *
     * *Amazon Aurora*
     *
     * Not applicable. Copying tags to snapshots is managed by the DB cluster. Setting this value for an Aurora DB instance has no effect on the DB cluster setting.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-copytagstosnapshot
     */
    public copyTagsToSnapshot: boolean | cdk.IResolvable | undefined;

    /**
     * The identifier of the DB cluster that the instance will belong to.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbclusteridentifier
     */
    public dbClusterIdentifier: string | undefined;

    /**
     * A name for the DB instance. If you specify a name, AWS CloudFormation converts it to lowercase. If you don't specify a name, AWS CloudFormation generates a unique physical ID and uses that ID for the DB instance. For more information, see [Name Type](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-name.html) .
     *
     * For information about constraints that apply to DB instance identifiers, see [Naming constraints in Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Limits.html#RDS_Limits.Constraints) in the *Amazon RDS User Guide* .
     *
     * > If you specify a name, you can't perform updates that require replacement of this resource. You can perform updates that require no or some interruption. If you must replace the resource, specify a new name.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbinstanceidentifier
     */
    public dbInstanceIdentifier: string | undefined;

    /**
     * The meaning of this parameter differs according to the database engine you use.
     *
     * > If you specify the `[DBSnapshotIdentifier](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbsnapshotidentifier)` property, AWS CloudFormation ignores this property.
     * >
     * > If you restore DB instances from snapshots, this property doesn't apply to the MySQL, PostgreSQL, or MariaDB engines.
     *
     * *Amazon Aurora*
     *
     * Not applicable. The database name is managed by the DB cluster.
     *
     * *MySQL*
     *
     * The name of the database to create when the DB instance is created. If this parameter is not specified, no database is created in the DB instance.
     *
     * Constraints:
     *
     * - Must contain 1 to 64 letters or numbers.
     * - Can't be a word reserved by the specified database engine
     *
     * *MariaDB*
     *
     * The name of the database to create when the DB instance is created. If this parameter is not specified, no database is created in the DB instance.
     *
     * Constraints:
     *
     * - Must contain 1 to 64 letters or numbers.
     * - Can't be a word reserved by the specified database engine
     *
     * *PostgreSQL*
     *
     * The name of the database to create when the DB instance is created. If this parameter is not specified, the default `postgres` database is created in the DB instance.
     *
     * Constraints:
     *
     * - Must contain 1 to 63 letters, numbers, or underscores.
     * - Must begin with a letter or an underscore. Subsequent characters can be letters, underscores, or digits (0-9).
     * - Can't be a word reserved by the specified database engine
     *
     * *Oracle*
     *
     * The Oracle System ID (SID) of the created DB instance. If you specify `null` , the default value `ORCL` is used. You can't specify the string NULL, or any other reserved word, for `DBName` .
     *
     * Default: `ORCL`
     *
     * Constraints:
     *
     * - Can't be longer than 8 characters
     *
     * *SQL Server*
     *
     * Not applicable. Must be null.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbname
     */
    public dbName: string | undefined;

    /**
     * The name of an existing DB parameter group or a reference to an [AWS::RDS::DBParameterGroup](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbparametergroup.html) resource created in the template.
     *
     * To list all of the available DB parameter group names, use the following command:
     *
     * `aws rds describe-db-parameter-groups --query "DBParameterGroups[].DBParameterGroupName" --output text`
     *
     * > If any of the data members of the referenced parameter group are changed during an update, the DB instance might need to be restarted, which causes some interruption. If the parameter group contains static parameters, whether they were changed or not, an update triggers a reboot.
     *
     * If you don't specify a value for the `DBParameterGroupName` property, the default DB parameter group for the specified engine and engine version is used.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbparametergroupname
     */
    public dbParameterGroupName: string | undefined;

    /**
     * A list of the DB security groups to assign to the DB instance. The list can include both the name of existing DB security groups or references to AWS::RDS::DBSecurityGroup resources created in the template.
     *
     * If you set DBSecurityGroups, you must not set VPCSecurityGroups, and vice versa. Also, note that the DBSecurityGroups property exists only for backwards compatibility with older regions and is no longer recommended for providing security information to an RDS DB instance. Instead, use VPCSecurityGroups.
     *
     * > If you specify this property, AWS CloudFormation sends only the following properties (if specified) to Amazon RDS during create operations:
     * >
     * > - `AllocatedStorage`
     * > - `AutoMinorVersionUpgrade`
     * > - `AvailabilityZone`
     * > - `BackupRetentionPeriod`
     * > - `CharacterSetName`
     * > - `DBInstanceClass`
     * > - `DBName`
     * > - `DBParameterGroupName`
     * > - `DBSecurityGroups`
     * > - `DBSubnetGroupName`
     * > - `Engine`
     * > - `EngineVersion`
     * > - `Iops`
     * > - `LicenseModel`
     * > - `MasterUsername`
     * > - `MasterUserPassword`
     * > - `MultiAZ`
     * > - `OptionGroupName`
     * > - `PreferredBackupWindow`
     * > - `PreferredMaintenanceWindow`
     * >
     * > All other properties are ignored. Specify a virtual private cloud (VPC) security group if you want to submit other properties, such as `StorageType` , `StorageEncrypted` , or `KmsKeyId` . If you're already using the `DBSecurityGroups` property, you can't use these other properties by updating your DB instance to use a VPC security group. You must recreate the DB instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbsecuritygroups
     */
    public dbSecurityGroups: string[] | undefined;

    /**
     * The name or Amazon Resource Name (ARN) of the DB snapshot that's used to restore the DB instance. If you're restoring from a shared manual DB snapshot, you must specify the ARN of the snapshot.
     *
     * By specifying this property, you can create a DB instance from the specified DB snapshot. If the `DBSnapshotIdentifier` property is an empty string or the `AWS::RDS::DBInstance` declaration has no `DBSnapshotIdentifier` property, AWS CloudFormation creates a new database. If the property contains a value (other than an empty string), AWS CloudFormation creates a database from the specified snapshot. If a snapshot with the specified name doesn't exist, AWS CloudFormation can't create the database and it rolls back the stack.
     *
     * Some DB instance properties aren't valid when you restore from a snapshot, such as the `MasterUsername` and `MasterUserPassword` properties. For information about the properties that you can specify, see the `RestoreDBInstanceFromDBSnapshot` action in the *Amazon RDS API Reference* .
     *
     * After you restore a DB instance with a `DBSnapshotIdentifier` property, you must specify the same `DBSnapshotIdentifier` property for any future updates to the DB instance. When you specify this property for an update, the DB instance is not restored from the DB snapshot again, and the data in the database is not changed. However, if you don't specify the `DBSnapshotIdentifier` property, an empty DB instance is created, and the original DB instance is deleted. If you specify a property that is different from the previous snapshot restore property, a new DB instance is restored from the specified `DBSnapshotIdentifier` property, and the original DB instance is deleted.
     *
     * If you specify the `DBSnapshotIdentifier` property to restore a DB instance (as opposed to specifying it for DB instance updates), then don't specify the following properties:
     *
     * - `CharacterSetName`
     * - `DBClusterIdentifier`
     * - `DBName`
     * - `DeleteAutomatedBackups`
     * - `EnablePerformanceInsights`
     * - `KmsKeyId`
     * - `MasterUsername`
     * - `MonitoringInterval`
     * - `MonitoringRoleArn`
     * - `PerformanceInsightsKMSKeyId`
     * - `PerformanceInsightsRetentionPeriod`
     * - `PromotionTier`
     * - `SourceDBInstanceIdentifier`
     * - `SourceRegion`
     * - `StorageEncrypted`
     * - `Timezone`
     *
     * *Amazon Aurora*
     *
     * Not applicable. Snapshot restore is managed by the DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbsnapshotidentifier
     */
    public dbSnapshotIdentifier: string | undefined;

    /**
     * A DB subnet group to associate with the DB instance. If you update this value, the new subnet group must be a subnet group in a new VPC.
     *
     * If there's no DB subnet group, then the DB instance isn't a VPC DB instance.
     *
     * For more information about using Amazon RDS in a VPC, see [Using Amazon RDS with Amazon Virtual Private Cloud (VPC)](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.html) in the *Amazon RDS User Guide* .
     *
     * *Amazon Aurora*
     *
     * Not applicable. The DB subnet group is managed by the DB cluster. If specified, the setting must match the DB cluster setting.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbsubnetgroupname
     */
    public dbSubnetGroupName: string | undefined;

    /**
     * A value that indicates whether to remove automated backups immediately after the DB instance is deleted. This parameter isn't case-sensitive. The default is to remove automated backups immediately after the DB instance is deleted.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-deleteautomatedbackups
     */
    public deleteAutomatedBackups: boolean | cdk.IResolvable | undefined;

    /**
     * A value that indicates whether the DB instance has deletion protection enabled. The database can't be deleted when deletion protection is enabled. By default, deletion protection is disabled. For more information, see [Deleting a DB Instance](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_DeleteInstance.html) .
     *
     * *Amazon Aurora*
     *
     * Not applicable. You can enable or disable deletion protection for the DB cluster. For more information, see `CreateDBCluster` . DB instances in a DB cluster can be deleted even when deletion protection is enabled for the DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-deletionprotection
     */
    public deletionProtection: boolean | cdk.IResolvable | undefined;

    /**
     * The Active Directory directory ID to create the DB instance in. Currently, only Microsoft SQL Server, Oracle, and PostgreSQL DB instances can be created in an Active Directory Domain.
     *
     * For more information, see [Kerberos Authentication](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/kerberos-authentication.html) in the *Amazon RDS User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-domain
     */
    public domain: string | undefined;

    /**
     * Specify the name of the IAM role to be used when making API calls to the Directory Service.
     *
     * This setting doesn't apply to RDS Custom.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-domainiamrolename
     */
    public domainIamRoleName: string | undefined;

    /**
     * The list of log types that need to be enabled for exporting to CloudWatch Logs. The values in the list depend on the DB engine being used. For more information, see [Publishing Database Logs to Amazon CloudWatch Logs](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_LogAccess.html#USER_LogAccess.Procedural.UploadtoCloudWatch) in the *Amazon Relational Database Service User Guide* .
     *
     * *Amazon Aurora*
     *
     * Not applicable. CloudWatch Logs exports are managed by the DB cluster.
     *
     * *MariaDB*
     *
     * Valid values: `audit` , `error` , `general` , `slowquery`
     *
     * *Microsoft SQL Server*
     *
     * Valid values: `agent` , `error`
     *
     * *MySQL*
     *
     * Valid values: `audit` , `error` , `general` , `slowquery`
     *
     * *Oracle*
     *
     * Valid values: `alert` , `audit` , `listener` , `trace`
     *
     * *PostgreSQL*
     *
     * Valid values: `postgresql` , `upgrade`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-enablecloudwatchlogsexports
     */
    public enableCloudwatchLogsExports: string[] | undefined;

    /**
     * A value that indicates whether to enable mapping of AWS Identity and Access Management (IAM) accounts to database accounts. By default, mapping is disabled.
     *
     * For more information, see [IAM Database Authentication for MySQL and PostgreSQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/UsingWithRDS.IAMDBAuth.html) in the *Amazon RDS User Guide.*
     *
     * *Amazon Aurora*
     *
     * Not applicable. Mapping AWS IAM accounts to database accounts is managed by the DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-enableiamdatabaseauthentication
     */
    public enableIamDatabaseAuthentication: boolean | cdk.IResolvable | undefined;

    /**
     * A value that indicates whether to enable Performance Insights for the DB instance. For more information, see [Using Amazon Performance Insights](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PerfInsights.html) in the *Amazon RDS User Guide* .
     *
     * This setting doesn't apply to RDS Custom.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-enableperformanceinsights
     */
    public enablePerformanceInsights: boolean | cdk.IResolvable | undefined;

    /**
     * The name of the database engine that you want to use for this DB instance.
     *
     * > When you are creating a DB instance, the `Engine` property is required.
     *
     * Valid Values:
     *
     * - `aurora` (for MySQL 5.6-compatible Aurora)
     * - `aurora-mysql` (for MySQL 5.7-compatible Aurora)
     * - `aurora-postgresql`
     * - `mariadb`
     * - `mysql`
     * - `oracle-ee`
     * - `oracle-se2`
     * - `oracle-se1`
     * - `oracle-se`
     * - `postgres`
     * - `sqlserver-ee`
     * - `sqlserver-se`
     * - `sqlserver-ex`
     * - `sqlserver-web`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-engine
     */
    public engine: string | undefined;

    /**
     * The version number of the database engine to use.
     *
     * For a list of valid engine versions, use the `DescribeDBEngineVersions` action.
     *
     * The following are the database engines and links to information about the major and minor versions that are available with Amazon RDS. Not every database engine is available for every AWS Region.
     *
     * *Amazon Aurora*
     *
     * Not applicable. The version number of the database engine to be used by the DB instance is managed by the DB cluster.
     *
     * *MariaDB*
     *
     * See [MariaDB on Amazon RDS Versions](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_MariaDB.html#MariaDB.Concepts.VersionMgmt) in the *Amazon RDS User Guide.*
     *
     * *Microsoft SQL Server*
     *
     * See [Microsoft SQL Server Versions on Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SQLServer.html#SQLServer.Concepts.General.VersionSupport) in the *Amazon RDS User Guide.*
     *
     * *MySQL*
     *
     * See [MySQL on Amazon RDS Versions](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_MySQL.html#MySQL.Concepts.VersionMgmt) in the *Amazon RDS User Guide.*
     *
     * *Oracle*
     *
     * See [Oracle Database Engine Release Notes](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Appendix.Oracle.PatchComposition.html) in the *Amazon RDS User Guide.*
     *
     * *PostgreSQL*
     *
     * See [Supported PostgreSQL Database Versions](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_PostgreSQL.html#PostgreSQL.Concepts.General.DBVersions) in the *Amazon RDS User Guide.*
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-engineversion
     */
    public engineVersion: string | undefined;

    /**
     * The number of I/O operations per second (IOPS) that the database provisions. The value must be equal to or greater than 1000.
     *
     * If you specify this property, you must follow the range of allowed ratios of your requested IOPS rate to the amount of storage that you allocate (IOPS to allocated storage). For example, you can provision an Oracle database instance with 1000 IOPS and 200 GiB of storage (a ratio of 5:1), or specify 2000 IOPS with 200 GiB of storage (a ratio of 10:1). For more information, see [Amazon RDS Provisioned IOPS Storage to Improve Performance](https://docs.aws.amazon.com/AmazonRDS/latest/DeveloperGuide/CHAP_Storage.html#USER_PIOPS) in the *Amazon RDS User Guide* .
     *
     * > If you specify `io1` for the `StorageType` property, then you must also specify the `Iops` property.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-iops
     */
    public iops: number | undefined;

    /**
     * The ARN of the AWS KMS key that's used to encrypt the DB instance, such as `arn:aws:kms:us-east-1:012345678910:key/abcd1234-a123-456a-a12b-a123b4cd56ef` . If you enable the StorageEncrypted property but don't specify this property, AWS CloudFormation uses the default KMS key. If you specify this property, you must set the StorageEncrypted property to true.
     *
     * If you specify the `SourceDBInstanceIdentifier` property, the value is inherited from the source DB instance if the read replica is created in the same region.
     *
     * If you create an encrypted read replica in a different AWS Region, then you must specify a KMS key for the destination AWS Region. KMS encryption keys are specific to the region that they're created in, and you can't use encryption keys from one region in another region.
     *
     * If you specify the `SnapshotIdentifier` property, the `StorageEncrypted` property value is inherited from the snapshot, and if the DB instance is encrypted, the specified `KmsKeyId` property is used.
     *
     * If you specify `DBSecurityGroups` , AWS CloudFormation ignores this property. To specify both a security group and this property, you must use a VPC security group. For more information about Amazon RDS and VPC, see [Using Amazon RDS with Amazon VPC](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html) in the *Amazon RDS User Guide* .
     *
     * *Amazon Aurora*
     *
     * Not applicable. The KMS key identifier is managed by the DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-kmskeyid
     */
    public kmsKeyId: string | undefined;

    /**
     * License model information for this DB instance.
     *
     * Valid values:
     *
     * - Aurora MySQL - `general-public-license`
     * - Aurora PostgreSQL - `postgresql-license`
     * - MariaDB - `general-public-license`
     * - Microsoft SQL Server - `license-included`
     * - MySQL - `general-public-license`
     * - Oracle - `bring-your-own-license` or `license-included`
     * - PostgreSQL - `postgresql-license`
     *
     * > If you've specified `DBSecurityGroups` and then you update the license model, AWS CloudFormation replaces the underlying DB instance. This will incur some interruptions to database availability.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-licensemodel
     */
    public licenseModel: string | undefined;

    /**
     * The master user name for the DB instance.
     *
     * > If you specify the `SourceDBInstanceIdentifier` or `DBSnapshotIdentifier` property, don't specify this property. The value is inherited from the source DB instance or snapshot.
     *
     * *Amazon Aurora*
     *
     * Not applicable. The name for the master user is managed by the DB cluster.
     *
     * *MariaDB*
     *
     * Constraints:
     *
     * - Required for MariaDB.
     * - Must be 1 to 16 letters or numbers.
     * - Can't be a reserved word for the chosen database engine.
     *
     * *Microsoft SQL Server*
     *
     * Constraints:
     *
     * - Required for SQL Server.
     * - Must be 1 to 128 letters or numbers.
     * - The first character must be a letter.
     * - Can't be a reserved word for the chosen database engine.
     *
     * *MySQL*
     *
     * Constraints:
     *
     * - Required for MySQL.
     * - Must be 1 to 16 letters or numbers.
     * - First character must be a letter.
     * - Can't be a reserved word for the chosen database engine.
     *
     * *Oracle*
     *
     * Constraints:
     *
     * - Required for Oracle.
     * - Must be 1 to 30 letters or numbers.
     * - First character must be a letter.
     * - Can't be a reserved word for the chosen database engine.
     *
     * *PostgreSQL*
     *
     * Constraints:
     *
     * - Required for PostgreSQL.
     * - Must be 1 to 63 letters or numbers.
     * - First character must be a letter.
     * - Can't be a reserved word for the chosen database engine.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-masterusername
     */
    public masterUsername: string | undefined;

    /**
     * The password for the master user. The password can include any printable ASCII character except "/", """, or "@".
     *
     * *Amazon Aurora*
     *
     * Not applicable. The password for the master user is managed by the DB cluster.
     *
     * *MariaDB*
     *
     * Constraints: Must contain from 8 to 41 characters.
     *
     * *Microsoft SQL Server*
     *
     * Constraints: Must contain from 8 to 128 characters.
     *
     * *MySQL*
     *
     * Constraints: Must contain from 8 to 41 characters.
     *
     * *Oracle*
     *
     * Constraints: Must contain from 8 to 30 characters.
     *
     * *PostgreSQL*
     *
     * Constraints: Must contain from 8 to 128 characters.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-masteruserpassword
     */
    public masterUserPassword: string | undefined;

    /**
     * The upper limit in gibibytes (GiB) to which Amazon RDS can automatically scale the storage of the DB instance.
     *
     * For more information about this setting, including limitations that apply to it, see [Managing capacity automatically with Amazon RDS storage autoscaling](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PIOPS.StorageTypes.html#USER_PIOPS.Autoscaling) in the *Amazon RDS User Guide* .
     *
     * This setting doesn't apply to RDS Custom.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-maxallocatedstorage
     */
    public maxAllocatedStorage: number | undefined;

    /**
     * The interval, in seconds, between points when Enhanced Monitoring metrics are collected for the DB instance. To disable collection of Enhanced Monitoring metrics, specify 0. The default is 0.
     *
     * If `MonitoringRoleArn` is specified, then you must set `MonitoringInterval` to a value other than 0.
     *
     * This setting doesn't apply to RDS Custom.
     *
     * Valid Values: `0, 1, 5, 10, 15, 30, 60`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-monitoringinterval
     */
    public monitoringInterval: number | undefined;

    /**
     * The ARN for the IAM role that permits RDS to send enhanced monitoring metrics to Amazon CloudWatch Logs. For example, `arn:aws:iam:123456789012:role/emaccess` . For information on creating a monitoring role, see [Setting Up and Enabling Enhanced Monitoring](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Monitoring.OS.html#USER_Monitoring.OS.Enabling) in the *Amazon RDS User Guide* .
     *
     * If `MonitoringInterval` is set to a value other than 0, then you must supply a `MonitoringRoleArn` value.
     *
     * This setting doesn't apply to RDS Custom.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-monitoringrolearn
     */
    public monitoringRoleArn: string | undefined;

    /**
     * Specifies whether the database instance is a Multi-AZ DB instance deployment. You can't set the `AvailabilityZone` parameter if the `MultiAZ` parameter is set to true.
     *
     * Currently, you can't use AWS CloudFormation to create a Multi-AZ DB cluster deployment.
     *
     * For more information, see [Multi-AZ deployments for high availability](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html) in the *Amazon RDS User Guide* .
     *
     * *Amazon Aurora*
     *
     * Not applicable. Amazon Aurora storage is replicated across all of the Availability Zones and doesn't require the `MultiAZ` option to be set.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-multiaz
     */
    public multiAz: boolean | cdk.IResolvable | undefined;

    /**
     * Indicates that the DB instance should be associated with the specified option group.
     *
     * Permanent options, such as the TDE option for Oracle Advanced Security TDE, can't be removed from an option group. Also, that option group can't be removed from a DB instance once it is associated with a DB instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-optiongroupname
     */
    public optionGroupName: string | undefined;

    /**
     * The AWS KMS key identifier for encryption of Performance Insights data.
     *
     * The KMS key identifier is the key ARN, key ID, alias ARN, or alias name for the KMS key.
     *
     * If you do not specify a value for `PerformanceInsightsKMSKeyId` , then Amazon RDS uses your default KMS key. There is a default KMS key for your AWS account. Your AWS account has a different default KMS key for each AWS Region.
     *
     * For information about enabling Performance Insights, see [EnablePerformanceInsights](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-enableperformanceinsights) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-performanceinsightskmskeyid
     */
    public performanceInsightsKmsKeyId: string | undefined;

    /**
     * The amount of time, in days, to retain Performance Insights data. Valid values are 7 or 731 (2 years).
     *
     * For information about enabling Performance Insights, see [EnablePerformanceInsights](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-enableperformanceinsights) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-performanceinsightsretentionperiod
     */
    public performanceInsightsRetentionPeriod: number | undefined;

    /**
     * The port number on which the database accepts connections.
     *
     * *Amazon Aurora*
     *
     * Not applicable. The port number is managed by the DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-port
     */
    public port: string | undefined;

    /**
     * The daily time range during which automated backups are created if automated backups are enabled, using the `BackupRetentionPeriod` parameter. For more information, see [Backup Window](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithAutomatedBackups.html#USER_WorkingWithAutomatedBackups.BackupWindow) in the *Amazon RDS User Guide.*
     *
     * Constraints:
     *
     * - Must be in the format `hh24:mi-hh24:mi` .
     * - Must be in Universal Coordinated Time (UTC).
     * - Must not conflict with the preferred maintenance window.
     * - Must be at least 30 minutes.
     *
     * *Amazon Aurora*
     *
     * Not applicable. The daily time range for creating automated backups is managed by the DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-preferredbackupwindow
     */
    public preferredBackupWindow: string | undefined;

    /**
     * The weekly time range during which system maintenance can occur, in Universal Coordinated Time (UTC).
     *
     * Format: `ddd:hh24:mi-ddd:hh24:mi`
     *
     * The default is a 30-minute window selected at random from an 8-hour block of time for each AWS Region, occurring on a random day of the week. To see the time blocks available, see [Adjusting the Preferred DB Instance Maintenance Window](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_UpgradeDBInstance.Maintenance.html#AdjustingTheMaintenanceWindow) in the *Amazon RDS User Guide.*
     *
     * > This property applies when AWS CloudFormation initially creates the DB instance. If you use AWS CloudFormation to update the DB instance, those updates are applied immediately.
     *
     * Constraints: Minimum 30-minute window.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-preferredmaintenancewindow
     */
    public preferredMaintenanceWindow: string | undefined;

    /**
     * The number of CPU cores and the number of threads per core for the DB instance class of the DB instance.
     *
     * This setting doesn't apply to RDS Custom.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-processorfeatures
     */
    public processorFeatures: Array<CfnDBInstance.ProcessorFeatureProperty | cdk.IResolvable> | cdk.IResolvable | undefined;

    /**
     * A value that specifies the order in which an Aurora Replica is promoted to the primary instance after a failure of the existing primary instance. For more information, see [Fault Tolerance for an Aurora DB Cluster](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Managing.Backups.html#Aurora.Managing.FaultTolerance) in the *Amazon Aurora User Guide* .
     *
     * This setting doesn't apply to RDS Custom.
     *
     * Default: 1
     *
     * Valid Values: 0 - 15
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-promotiontier
     */
    public promotionTier: number | undefined;

    /**
     * Indicates whether the DB instance is an internet-facing instance. If you specify `true` , AWS CloudFormation creates an instance with a publicly resolvable DNS name, which resolves to a public IP address. If you specify false, AWS CloudFormation creates an internal instance with a DNS name that resolves to a private IP address.
     *
     * The default behavior value depends on your VPC setup and the database subnet group. For more information, see the `PubliclyAccessible` parameter in [`CreateDBInstance`](https://docs.aws.amazon.com/AmazonRDS/latest/APIReference/API_CreateDBInstance.html) in the *Amazon RDS API Reference* .
     *
     * If this resource has a public IP address and is also in a VPC that is defined in the same template, you must use the *DependsOn* attribute to declare a dependency on the VPC-gateway attachment. For more information, see [DependsOn Attribute](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-dependson.html) .
     *
     * > If you specify DBSecurityGroups, AWS CloudFormation ignores this property. To specify a security group and this property, you must use a VPC security group. For more information about Amazon RDS and VPC, see [Using Amazon RDS with Amazon VPC](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.html) in the *Amazon RDS User Guide* .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-publiclyaccessible
     */
    public publiclyAccessible: boolean | cdk.IResolvable | undefined;

    /**
     * If you want to create a read replica DB instance, specify the ID of the source DB instance. Each DB instance can have a limited number of read replicas. For more information, see [Working with Read Replicas](https://docs.aws.amazon.com/AmazonRDS/latest/DeveloperGuide/USER_ReadRepl.html) in the *Amazon RDS User Guide* .
     *
     * For information about constraints that apply to DB instance identifiers, see [Naming constraints in Amazon RDS](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Limits.html#RDS_Limits.Constraints) in the *Amazon RDS User Guide* .
     *
     * The `SourceDBInstanceIdentifier` property determines whether a DB instance is a read replica. If you remove the `SourceDBInstanceIdentifier` property from your template and then update your stack, AWS CloudFormation deletes the Read Replica and creates a new DB instance (not a read replica).
     *
     * > - If you specify a source DB instance that uses VPC security groups, we recommend that you specify the `VPCSecurityGroups` property. If you don't specify the property, the read replica inherits the value of the `VPCSecurityGroups` property from the source DB when you create the replica. However, if you update the stack, AWS CloudFormation reverts the replica's `VPCSecurityGroups` property to the default value because it's not defined in the stack's template. This change might cause unexpected issues.
     * > - Read replicas don't support deletion policies. AWS CloudFormation ignores any deletion policy that's associated with a read replica.
     * > - If you specify `SourceDBInstanceIdentifier` , don't specify the `DBSnapshotIdentifier` property. You can't create a read replica from a snapshot.
     * > - Don't set the `BackupRetentionPeriod` , `DBName` , `MasterUsername` , `MasterUserPassword` , and `PreferredBackupWindow` properties. The database attributes are inherited from the source DB instance, and backups are disabled for read replicas.
     * > - If the source DB instance is in a different region than the read replica, specify the source region in `SourceRegion` , and specify an ARN for a valid DB instance in `SourceDBInstanceIdentifier` . For more information, see [Constructing a Amazon RDS Amazon Resource Name (ARN)](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Tagging.html#USER_Tagging.ARN) in the *Amazon RDS User Guide* .
     * > - For DB instances in Amazon Aurora clusters, don't specify this property. Amazon RDS automatically assigns writer and reader DB instances.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-sourcedbinstanceidentifier
     */
    public sourceDbInstanceIdentifier: string | undefined;

    /**
     * The ID of the region that contains the source DB instance for the read replica.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-sourceregion
     */
    public sourceRegion: string | undefined;

    /**
     * A value that indicates whether the DB instance is encrypted. By default, it isn't encrypted.
     *
     * If you specify the `KmsKeyId` property, then you must enable encryption.
     *
     * If you specify the `SnapshotIdentifier` or `SourceDBInstanceIdentifier` property, don't specify this property. The value is inherited from the snapshot or source DB instance, and if the DB instance is encrypted, the specified `KmsKeyId` property is used.
     *
     * *Amazon Aurora*
     *
     * Not applicable. The encryption for DB instances is managed by the DB cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-storageencrypted
     */
    public storageEncrypted: boolean | cdk.IResolvable | undefined;

    /**
     * Specifies the storage type to be associated with the DB instance.
     *
     * Valid values: `standard | gp2 | io1`
     *
     * The `standard` value is also known as magnetic.
     *
     * If you specify `io1` , you must also include a value for the `Iops` parameter.
     *
     * Default: `io1` if the `Iops` parameter is specified, otherwise `standard`
     *
     * For more information, see [Amazon RDS DB Instance Storage](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_Storage.html) in the *Amazon RDS User Guide* .
     *
     * *Amazon Aurora*
     *
     * Not applicable. Aurora data is stored in the cluster volume, which is a single, virtual volume that uses solid state drives (SSDs).
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-storagetype
     */
    public storageType: string | undefined;

    /**
     * Tags to assign to the DB instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * The time zone of the DB instance. The time zone parameter is currently supported only by [Microsoft SQL Server](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/CHAP_SQLServer.html#SQLServer.Concepts.General.TimeZone) .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-timezone
     */
    public timezone: string | undefined;

    /**
     * A value that indicates whether the DB instance class of the DB instance uses its default processor features.
     *
     * This setting doesn't apply to RDS Custom.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-usedefaultprocessorfeatures
     */
    public useDefaultProcessorFeatures: boolean | cdk.IResolvable | undefined;

    /**
     * A list of the VPC security group IDs to assign to the DB instance. The list can include both the physical IDs of existing VPC security groups and references to [AWS::EC2::SecurityGroup](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-security-group.html) resources created in the template.
     *
     * If you plan to update the resource, don't specify VPC security groups in a shared VPC.
     *
     * If you set `VPCSecurityGroups` , you must not set [`DBSecurityGroups`](https://docs.aws.amazon.com//AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbsecuritygroups) , and vice versa.
     *
     * > You can migrate a DB instance in your stack from an RDS DB security group to a VPC security group, but keep the following in mind:
     * >
     * > - You can't revert to using an RDS security group after you establish a VPC security group membership.
     * > - When you migrate your DB instance to VPC security groups, if your stack update rolls back because the DB instance update fails or because an update fails in another AWS CloudFormation resource, the rollback fails because it can't revert to an RDS security group.
     * > - To use the properties that are available when you use a VPC security group, you must recreate the DB instance. If you don't, AWS CloudFormation submits only the property values that are listed in the [`DBSecurityGroups`](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-dbsecuritygroups) property.
     *
     * To avoid this situation, migrate your DB instance to using VPC security groups only when that is the only change in your stack template.
     *
     * *Amazon Aurora*
     *
     * Not applicable. The associated list of EC2 VPC security groups is managed by the DB cluster. If specified, the setting must match the DB cluster setting.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html#cfn-rds-dbinstance-vpcsecuritygroups
     */
    public vpcSecurityGroups: string[] | undefined;

    /**
     * Create a new `AWS::RDS::DBInstance`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDBInstanceProps) {
        super(scope, id, { type: CfnDBInstance.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'dbInstanceClass', this);
        this.attrEndpointAddress = cdk.Token.asString(this.getAtt('Endpoint.Address'));
        this.attrEndpointPort = cdk.Token.asString(this.getAtt('Endpoint.Port'));

        this.dbInstanceClass = props.dbInstanceClass;
        this.allocatedStorage = props.allocatedStorage;
        this.allowMajorVersionUpgrade = props.allowMajorVersionUpgrade;
        this.associatedRoles = props.associatedRoles;
        this.autoMinorVersionUpgrade = props.autoMinorVersionUpgrade;
        this.availabilityZone = props.availabilityZone;
        this.backupRetentionPeriod = props.backupRetentionPeriod;
        this.caCertificateIdentifier = props.caCertificateIdentifier;
        this.characterSetName = props.characterSetName;
        this.copyTagsToSnapshot = props.copyTagsToSnapshot;
        this.dbClusterIdentifier = props.dbClusterIdentifier;
        this.dbInstanceIdentifier = props.dbInstanceIdentifier;
        this.dbName = props.dbName;
        this.dbParameterGroupName = props.dbParameterGroupName;
        this.dbSecurityGroups = props.dbSecurityGroups;
        this.dbSnapshotIdentifier = props.dbSnapshotIdentifier;
        this.dbSubnetGroupName = props.dbSubnetGroupName;
        this.deleteAutomatedBackups = props.deleteAutomatedBackups;
        this.deletionProtection = props.deletionProtection;
        this.domain = props.domain;
        this.domainIamRoleName = props.domainIamRoleName;
        this.enableCloudwatchLogsExports = props.enableCloudwatchLogsExports;
        this.enableIamDatabaseAuthentication = props.enableIamDatabaseAuthentication;
        this.enablePerformanceInsights = props.enablePerformanceInsights;
        this.engine = props.engine;
        this.engineVersion = props.engineVersion;
        this.iops = props.iops;
        this.kmsKeyId = props.kmsKeyId;
        this.licenseModel = props.licenseModel;
        this.masterUsername = props.masterUsername;
        this.masterUserPassword = props.masterUserPassword;
        this.maxAllocatedStorage = props.maxAllocatedStorage;
        this.monitoringInterval = props.monitoringInterval;
        this.monitoringRoleArn = props.monitoringRoleArn;
        this.multiAz = props.multiAz;
        this.optionGroupName = props.optionGroupName;
        this.performanceInsightsKmsKeyId = props.performanceInsightsKmsKeyId;
        this.performanceInsightsRetentionPeriod = props.performanceInsightsRetentionPeriod;
        this.port = props.port;
        this.preferredBackupWindow = props.preferredBackupWindow;
        this.preferredMaintenanceWindow = props.preferredMaintenanceWindow;
        this.processorFeatures = props.processorFeatures;
        this.promotionTier = props.promotionTier;
        this.publiclyAccessible = props.publiclyAccessible;
        this.sourceDbInstanceIdentifier = props.sourceDbInstanceIdentifier;
        this.sourceRegion = props.sourceRegion;
        this.storageEncrypted = props.storageEncrypted;
        this.storageType = props.storageType;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::RDS::DBInstance", props.tags, { tagPropertyName: 'tags' });
        this.timezone = props.timezone;
        this.useDefaultProcessorFeatures = props.useDefaultProcessorFeatures;
        this.vpcSecurityGroups = props.vpcSecurityGroups;
        if (this.node.scope && cdk.Resource.isResource(this.node.scope)) {
            this.node.addValidation({ validate: () => this.cfnOptions.deletionPolicy === undefined
              ? ['\'AWS::RDS::DBInstance\' is a stateful resource type, and you must specify a Removal Policy for it. Call \'resource.applyRemovalPolicy()\'.']
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
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDBInstance.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            dbInstanceClass: this.dbInstanceClass,
            allocatedStorage: this.allocatedStorage,
            allowMajorVersionUpgrade: this.allowMajorVersionUpgrade,
            associatedRoles: this.associatedRoles,
            autoMinorVersionUpgrade: this.autoMinorVersionUpgrade,
            availabilityZone: this.availabilityZone,
            backupRetentionPeriod: this.backupRetentionPeriod,
            caCertificateIdentifier: this.caCertificateIdentifier,
            characterSetName: this.characterSetName,
            copyTagsToSnapshot: this.copyTagsToSnapshot,
            dbClusterIdentifier: this.dbClusterIdentifier,
            dbInstanceIdentifier: this.dbInstanceIdentifier,
            dbName: this.dbName,
            dbParameterGroupName: this.dbParameterGroupName,
            dbSecurityGroups: this.dbSecurityGroups,
            dbSnapshotIdentifier: this.dbSnapshotIdentifier,
            dbSubnetGroupName: this.dbSubnetGroupName,
            deleteAutomatedBackups: this.deleteAutomatedBackups,
            deletionProtection: this.deletionProtection,
            domain: this.domain,
            domainIamRoleName: this.domainIamRoleName,
            enableCloudwatchLogsExports: this.enableCloudwatchLogsExports,
            enableIamDatabaseAuthentication: this.enableIamDatabaseAuthentication,
            enablePerformanceInsights: this.enablePerformanceInsights,
            engine: this.engine,
            engineVersion: this.engineVersion,
            iops: this.iops,
            kmsKeyId: this.kmsKeyId,
            licenseModel: this.licenseModel,
            masterUsername: this.masterUsername,
            masterUserPassword: this.masterUserPassword,
            maxAllocatedStorage: this.maxAllocatedStorage,
            monitoringInterval: this.monitoringInterval,
            monitoringRoleArn: this.monitoringRoleArn,
            multiAz: this.multiAz,
            optionGroupName: this.optionGroupName,
            performanceInsightsKmsKeyId: this.performanceInsightsKmsKeyId,
            performanceInsightsRetentionPeriod: this.performanceInsightsRetentionPeriod,
            port: this.port,
            preferredBackupWindow: this.preferredBackupWindow,
            preferredMaintenanceWindow: this.preferredMaintenanceWindow,
            processorFeatures: this.processorFeatures,
            promotionTier: this.promotionTier,
            publiclyAccessible: this.publiclyAccessible,
            sourceDbInstanceIdentifier: this.sourceDbInstanceIdentifier,
            sourceRegion: this.sourceRegion,
            storageEncrypted: this.storageEncrypted,
            storageType: this.storageType,
            tags: this.tags.renderTags(),
            timezone: this.timezone,
            useDefaultProcessorFeatures: this.useDefaultProcessorFeatures,
            vpcSecurityGroups: this.vpcSecurityGroups,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDBInstancePropsToCloudFormation(props);
    }
}

export namespace CfnDBInstance {
    /**
     * Describes an AWS Identity and Access Management (IAM) role that is associated with a DB instance.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbinstance-dbinstancerole.html
     */
    export interface DBInstanceRoleProperty {
        /**
         * The name of the feature associated with the AWS Identity and Access Management (IAM) role. IAM roles that are associated with a DB instance grant permission for the DB instance to access other AWS services on your behalf. For the list of supported feature names, see the `SupportedFeatureNames` description in [DBEngineVersion](https://docs.aws.amazon.com/AmazonRDS/latest/APIReference/API_DBEngineVersion.html) in the *Amazon RDS API Reference* .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbinstance-dbinstancerole.html#cfn-rds-dbinstance-dbinstancerole-featurename
         */
        readonly featureName: string;
        /**
         * The Amazon Resource Name (ARN) of the IAM role that is associated with the DB instance.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbinstance-dbinstancerole.html#cfn-rds-dbinstance-dbinstancerole-rolearn
         */
        readonly roleArn: string;
    }
}

/**
 * Determine whether the given properties match those of a `DBInstanceRoleProperty`
 *
 * @param properties - the TypeScript properties of a `DBInstanceRoleProperty`
 *
 * @returns the result of the validation.
 */
function CfnDBInstance_DBInstanceRolePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('featureName', cdk.requiredValidator)(properties.featureName));
    errors.collect(cdk.propertyValidator('featureName', cdk.validateString)(properties.featureName));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    return errors.wrap('supplied properties not correct for "DBInstanceRoleProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::DBInstance.DBInstanceRole` resource
 *
 * @param properties - the TypeScript properties of a `DBInstanceRoleProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::DBInstance.DBInstanceRole` resource.
 */
// @ts-ignore TS6133
function cfnDBInstanceDBInstanceRolePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDBInstance_DBInstanceRolePropertyValidator(properties).assertSuccess();
    return {
        FeatureName: cdk.stringToCloudFormation(properties.featureName),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
    };
}

// @ts-ignore TS6133
function CfnDBInstanceDBInstanceRolePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDBInstance.DBInstanceRoleProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDBInstance.DBInstanceRoleProperty>();
    ret.addPropertyResult('featureName', 'FeatureName', cfn_parse.FromCloudFormation.getString(properties.FeatureName));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDBInstance {
    /**
     * The `ProcessorFeature` property type specifies the processor features of a DB instance class status.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbinstance-processorfeature.html
     */
    export interface ProcessorFeatureProperty {
        /**
         * The name of the processor feature. Valid names are `coreCount` and `threadsPerCore` .
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbinstance-processorfeature.html#cfn-rds-dbinstance-processorfeature-name
         */
        readonly name?: string;
        /**
         * The value of a processor feature name.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbinstance-processorfeature.html#cfn-rds-dbinstance-processorfeature-value
         */
        readonly value?: string;
    }
}

/**
 * Determine whether the given properties match those of a `ProcessorFeatureProperty`
 *
 * @param properties - the TypeScript properties of a `ProcessorFeatureProperty`
 *
 * @returns the result of the validation.
 */
function CfnDBInstance_ProcessorFeaturePropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "ProcessorFeatureProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::DBInstance.ProcessorFeature` resource
 *
 * @param properties - the TypeScript properties of a `ProcessorFeatureProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::DBInstance.ProcessorFeature` resource.
 */
// @ts-ignore TS6133
function cfnDBInstanceProcessorFeaturePropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDBInstance_ProcessorFeaturePropertyValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnDBInstanceProcessorFeaturePropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDBInstance.ProcessorFeatureProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDBInstance.ProcessorFeatureProperty>();
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('value', 'Value', properties.Value != null ? cfn_parse.FromCloudFormation.getString(properties.Value) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnDBParameterGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbparametergroup.html
 */
export interface CfnDBParameterGroupProps {

    /**
     * Provides the customer-specified description for this DB parameter group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbparametergroup.html#cfn-rds-dbparametergroup-description
     */
    readonly description: string;

    /**
     * The DB parameter group family name. A DB parameter group can be associated with one and only one DB parameter group family, and can be applied only to a DB instance running a DB engine and engine version compatible with that DB parameter group family.
     *
     * > The DB parameter group family can't be changed when updating a DB parameter group.
     *
     * To list all of the available parameter group families, use the following command:
     *
     * `aws rds describe-db-engine-versions --query "DBEngineVersions[].DBParameterGroupFamily"`
     *
     * The output contains duplicates.
     *
     * For more information, see `[CreateDBParameterGroup](https://docs.aws.amazon.com//AmazonRDS/latest/APIReference/API_CreateDBParameterGroup.html)` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbparametergroup.html#cfn-rds-dbparametergroup-family
     */
    readonly family: string;

    /**
     * An array of parameter names and values for the parameter update. At least one parameter name and value must be supplied. Subsequent arguments are optional.
     *
     * For more information about DB parameters and DB parameter groups for Amazon RDS DB engines, see [Working with DB Parameter Groups](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithParamGroups.html) in the *Amazon RDS User Guide* .
     *
     * For more information about DB cluster and DB instance parameters and parameter groups for Amazon Aurora DB engines, see [Working with DB Parameter Groups and DB Cluster Parameter Groups](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_WorkingWithParamGroups.html) in the *Amazon Aurora User Guide* .
     *
     * > AWS CloudFormation doesn't support specifying an apply method for each individual parameter. The default apply method for each parameter is used.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbparametergroup.html#cfn-rds-dbparametergroup-parameters
     */
    readonly parameters?: { [key: string]: (string) } | cdk.IResolvable;

    /**
     * Tags to assign to the DB parameter group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbparametergroup.html#cfn-rds-dbparametergroup-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnDBParameterGroupProps`
 *
 * @param properties - the TypeScript properties of a `CfnDBParameterGroupProps`
 *
 * @returns the result of the validation.
 */
function CfnDBParameterGroupPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('description', cdk.requiredValidator)(properties.description));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('family', cdk.requiredValidator)(properties.family));
    errors.collect(cdk.propertyValidator('family', cdk.validateString)(properties.family));
    errors.collect(cdk.propertyValidator('parameters', cdk.hashValidator(cdk.validateString))(properties.parameters));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnDBParameterGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::DBParameterGroup` resource
 *
 * @param properties - the TypeScript properties of a `CfnDBParameterGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::DBParameterGroup` resource.
 */
// @ts-ignore TS6133
function cfnDBParameterGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDBParameterGroupPropsValidator(properties).assertSuccess();
    return {
        Description: cdk.stringToCloudFormation(properties.description),
        Family: cdk.stringToCloudFormation(properties.family),
        Parameters: cdk.hashMapper(cdk.stringToCloudFormation)(properties.parameters),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnDBParameterGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDBParameterGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDBParameterGroupProps>();
    ret.addPropertyResult('description', 'Description', cfn_parse.FromCloudFormation.getString(properties.Description));
    ret.addPropertyResult('family', 'Family', cfn_parse.FromCloudFormation.getString(properties.Family));
    ret.addPropertyResult('parameters', 'Parameters', properties.Parameters != null ? cfn_parse.FromCloudFormation.getMap(cfn_parse.FromCloudFormation.getString)(properties.Parameters) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::RDS::DBParameterGroup`
 *
 * The `AWS::RDS::DBParameterGroup` resource creates a custom parameter group for an RDS database family.
 *
 * This type can be declared in a template and referenced in the `DBParameterGroupName` property of an `[AWS::RDS::DBInstance](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-database-instance.html)` resource.
 *
 * For information about configuring parameters for Amazon RDS DB instances, see [Working with DB parameter groups](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithParamGroups.html) in the *Amazon RDS User Guide* .
 *
 * For information about configuring parameters for Amazon Aurora DB instances, see [Working with DB parameter groups and DB cluster parameter groups](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_WorkingWithParamGroups.html) in the *Amazon Aurora User Guide* .
 *
 * > Applying a parameter group to a DB instance may require the DB instance to reboot, resulting in a database outage for the duration of the reboot.
 *
 * @cloudformationResource AWS::RDS::DBParameterGroup
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbparametergroup.html
 */
export class CfnDBParameterGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::RDS::DBParameterGroup";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDBParameterGroup {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDBParameterGroupPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDBParameterGroup(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Provides the customer-specified description for this DB parameter group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbparametergroup.html#cfn-rds-dbparametergroup-description
     */
    public description: string;

    /**
     * The DB parameter group family name. A DB parameter group can be associated with one and only one DB parameter group family, and can be applied only to a DB instance running a DB engine and engine version compatible with that DB parameter group family.
     *
     * > The DB parameter group family can't be changed when updating a DB parameter group.
     *
     * To list all of the available parameter group families, use the following command:
     *
     * `aws rds describe-db-engine-versions --query "DBEngineVersions[].DBParameterGroupFamily"`
     *
     * The output contains duplicates.
     *
     * For more information, see `[CreateDBParameterGroup](https://docs.aws.amazon.com//AmazonRDS/latest/APIReference/API_CreateDBParameterGroup.html)` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbparametergroup.html#cfn-rds-dbparametergroup-family
     */
    public family: string;

    /**
     * An array of parameter names and values for the parameter update. At least one parameter name and value must be supplied. Subsequent arguments are optional.
     *
     * For more information about DB parameters and DB parameter groups for Amazon RDS DB engines, see [Working with DB Parameter Groups](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_WorkingWithParamGroups.html) in the *Amazon RDS User Guide* .
     *
     * For more information about DB cluster and DB instance parameters and parameter groups for Amazon Aurora DB engines, see [Working with DB Parameter Groups and DB Cluster Parameter Groups](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_WorkingWithParamGroups.html) in the *Amazon Aurora User Guide* .
     *
     * > AWS CloudFormation doesn't support specifying an apply method for each individual parameter. The default apply method for each parameter is used.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbparametergroup.html#cfn-rds-dbparametergroup-parameters
     */
    public parameters: { [key: string]: (string) } | cdk.IResolvable | undefined;

    /**
     * Tags to assign to the DB parameter group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbparametergroup.html#cfn-rds-dbparametergroup-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::RDS::DBParameterGroup`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDBParameterGroupProps) {
        super(scope, id, { type: CfnDBParameterGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'description', this);
        cdk.requireProperty(props, 'family', this);

        this.description = props.description;
        this.family = props.family;
        this.parameters = props.parameters;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::RDS::DBParameterGroup", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDBParameterGroup.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            description: this.description,
            family: this.family,
            parameters: this.parameters,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDBParameterGroupPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnDBProxy`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html
 */
export interface CfnDBProxyProps {

    /**
     * The authorization mechanism that the proxy uses.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#cfn-rds-dbproxy-auth
     */
    readonly auth: Array<CfnDBProxy.AuthFormatProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The identifier for the proxy. This name must be unique for all proxies owned by your AWS account in the specified AWS Region . An identifier must begin with a letter and must contain only ASCII letters, digits, and hyphens; it can't end with a hyphen or contain two consecutive hyphens.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#cfn-rds-dbproxy-dbproxyname
     */
    readonly dbProxyName: string;

    /**
     * The kinds of databases that the proxy can connect to. This value determines which database network protocol the proxy recognizes when it interprets network traffic to and from the database. The engine family applies to MySQL and PostgreSQL for both RDS and Aurora.
     *
     * *Valid values* : `MYSQL` | `POSTGRESQL`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#cfn-rds-dbproxy-enginefamily
     */
    readonly engineFamily: string;

    /**
     * The Amazon Resource Name (ARN) of the IAM role that the proxy uses to access secrets in AWS Secrets Manager.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#cfn-rds-dbproxy-rolearn
     */
    readonly roleArn: string;

    /**
     * One or more VPC subnet IDs to associate with the new proxy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#cfn-rds-dbproxy-vpcsubnetids
     */
    readonly vpcSubnetIds: string[];

    /**
     * Whether the proxy includes detailed information about SQL statements in its logs. This information helps you to debug issues involving SQL behavior or the performance and scalability of the proxy connections. The debug information includes the text of SQL statements that you submit through the proxy. Thus, only enable this setting when needed for debugging, and only when you have security measures in place to safeguard any sensitive information that appears in the logs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#cfn-rds-dbproxy-debuglogging
     */
    readonly debugLogging?: boolean | cdk.IResolvable;

    /**
     * The number of seconds that a connection to the proxy can be inactive before the proxy disconnects it. You can set this value higher or lower than the connection timeout limit for the associated database.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#cfn-rds-dbproxy-idleclienttimeout
     */
    readonly idleClientTimeout?: number;

    /**
     * A Boolean parameter that specifies whether Transport Layer Security (TLS) encryption is required for connections to the proxy. By enabling this setting, you can enforce encrypted TLS connections to the proxy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#cfn-rds-dbproxy-requiretls
     */
    readonly requireTls?: boolean | cdk.IResolvable;

    /**
     * An optional set of key-value pairs to associate arbitrary data of your choosing with the proxy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#cfn-rds-dbproxy-tags
     */
    readonly tags?: CfnDBProxy.TagFormatProperty[];

    /**
     * One or more VPC security group IDs to associate with the new proxy.
     *
     * If you plan to update the resource, don't specify VPC security groups in a shared VPC.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#cfn-rds-dbproxy-vpcsecuritygroupids
     */
    readonly vpcSecurityGroupIds?: string[];
}

/**
 * Determine whether the given properties match those of a `CfnDBProxyProps`
 *
 * @param properties - the TypeScript properties of a `CfnDBProxyProps`
 *
 * @returns the result of the validation.
 */
function CfnDBProxyPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('auth', cdk.requiredValidator)(properties.auth));
    errors.collect(cdk.propertyValidator('auth', cdk.listValidator(CfnDBProxy_AuthFormatPropertyValidator))(properties.auth));
    errors.collect(cdk.propertyValidator('dbProxyName', cdk.requiredValidator)(properties.dbProxyName));
    errors.collect(cdk.propertyValidator('dbProxyName', cdk.validateString)(properties.dbProxyName));
    errors.collect(cdk.propertyValidator('debugLogging', cdk.validateBoolean)(properties.debugLogging));
    errors.collect(cdk.propertyValidator('engineFamily', cdk.requiredValidator)(properties.engineFamily));
    errors.collect(cdk.propertyValidator('engineFamily', cdk.validateString)(properties.engineFamily));
    errors.collect(cdk.propertyValidator('idleClientTimeout', cdk.validateNumber)(properties.idleClientTimeout));
    errors.collect(cdk.propertyValidator('requireTls', cdk.validateBoolean)(properties.requireTls));
    errors.collect(cdk.propertyValidator('roleArn', cdk.requiredValidator)(properties.roleArn));
    errors.collect(cdk.propertyValidator('roleArn', cdk.validateString)(properties.roleArn));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(CfnDBProxy_TagFormatPropertyValidator))(properties.tags));
    errors.collect(cdk.propertyValidator('vpcSecurityGroupIds', cdk.listValidator(cdk.validateString))(properties.vpcSecurityGroupIds));
    errors.collect(cdk.propertyValidator('vpcSubnetIds', cdk.requiredValidator)(properties.vpcSubnetIds));
    errors.collect(cdk.propertyValidator('vpcSubnetIds', cdk.listValidator(cdk.validateString))(properties.vpcSubnetIds));
    return errors.wrap('supplied properties not correct for "CfnDBProxyProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::DBProxy` resource
 *
 * @param properties - the TypeScript properties of a `CfnDBProxyProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::DBProxy` resource.
 */
// @ts-ignore TS6133
function cfnDBProxyPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDBProxyPropsValidator(properties).assertSuccess();
    return {
        Auth: cdk.listMapper(cfnDBProxyAuthFormatPropertyToCloudFormation)(properties.auth),
        DBProxyName: cdk.stringToCloudFormation(properties.dbProxyName),
        EngineFamily: cdk.stringToCloudFormation(properties.engineFamily),
        RoleArn: cdk.stringToCloudFormation(properties.roleArn),
        VpcSubnetIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.vpcSubnetIds),
        DebugLogging: cdk.booleanToCloudFormation(properties.debugLogging),
        IdleClientTimeout: cdk.numberToCloudFormation(properties.idleClientTimeout),
        RequireTLS: cdk.booleanToCloudFormation(properties.requireTls),
        Tags: cdk.listMapper(cfnDBProxyTagFormatPropertyToCloudFormation)(properties.tags),
        VpcSecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.vpcSecurityGroupIds),
    };
}

// @ts-ignore TS6133
function CfnDBProxyPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDBProxyProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDBProxyProps>();
    ret.addPropertyResult('auth', 'Auth', cfn_parse.FromCloudFormation.getArray(CfnDBProxyAuthFormatPropertyFromCloudFormation)(properties.Auth));
    ret.addPropertyResult('dbProxyName', 'DBProxyName', cfn_parse.FromCloudFormation.getString(properties.DBProxyName));
    ret.addPropertyResult('engineFamily', 'EngineFamily', cfn_parse.FromCloudFormation.getString(properties.EngineFamily));
    ret.addPropertyResult('roleArn', 'RoleArn', cfn_parse.FromCloudFormation.getString(properties.RoleArn));
    ret.addPropertyResult('vpcSubnetIds', 'VpcSubnetIds', cfn_parse.FromCloudFormation.getStringArray(properties.VpcSubnetIds));
    ret.addPropertyResult('debugLogging', 'DebugLogging', properties.DebugLogging != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DebugLogging) : undefined);
    ret.addPropertyResult('idleClientTimeout', 'IdleClientTimeout', properties.IdleClientTimeout != null ? cfn_parse.FromCloudFormation.getNumber(properties.IdleClientTimeout) : undefined);
    ret.addPropertyResult('requireTls', 'RequireTLS', properties.RequireTLS != null ? cfn_parse.FromCloudFormation.getBoolean(properties.RequireTLS) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(CfnDBProxyTagFormatPropertyFromCloudFormation)(properties.Tags) : undefined as any);
    ret.addPropertyResult('vpcSecurityGroupIds', 'VpcSecurityGroupIds', properties.VpcSecurityGroupIds != null ? cfn_parse.FromCloudFormation.getStringArray(properties.VpcSecurityGroupIds) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::RDS::DBProxy`
 *
 * The `AWS::RDS::DBProxy` resource creates or updates a DB proxy.
 *
 * For information about RDS Proxy for Amazon RDS, see [Managing Connections with Amazon RDS Proxy](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html) in the *Amazon RDS User Guide* .
 *
 * For information about RDS Proxy for Amazon Aurora, see [Managing Connections with Amazon RDS Proxy](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy.html) in the *Amazon Aurora User Guide* .
 *
 * > Limitations apply to RDS Proxy, including DB engine version limitations and AWS Region limitations.
 * >
 * > For information about limitations that apply to RDS Proxy for Amazon RDS, see [Limitations for RDS Proxy](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html#rds-proxy.limitations) in the *Amazon RDS User Guide* .
 * >
 * > For information about that apply to RDS Proxy for Amazon Aurora, see [Limitations for RDS Proxy](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy.html#rds-proxy.limitations) in the *Amazon Aurora User Guide* .
 *
 * @cloudformationResource AWS::RDS::DBProxy
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html
 */
export class CfnDBProxy extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::RDS::DBProxy";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDBProxy {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDBProxyPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDBProxy(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) representing the target group.
     * @cloudformationAttribute DBProxyArn
     */
    public readonly attrDbProxyArn: string;

    /**
     * The writer endpoint for the RDS DB instance or Aurora DB cluster.
     * @cloudformationAttribute Endpoint
     */
    public readonly attrEndpoint: string;

    /**
     * The authorization mechanism that the proxy uses.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#cfn-rds-dbproxy-auth
     */
    public auth: Array<CfnDBProxy.AuthFormatProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The identifier for the proxy. This name must be unique for all proxies owned by your AWS account in the specified AWS Region . An identifier must begin with a letter and must contain only ASCII letters, digits, and hyphens; it can't end with a hyphen or contain two consecutive hyphens.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#cfn-rds-dbproxy-dbproxyname
     */
    public dbProxyName: string;

    /**
     * The kinds of databases that the proxy can connect to. This value determines which database network protocol the proxy recognizes when it interprets network traffic to and from the database. The engine family applies to MySQL and PostgreSQL for both RDS and Aurora.
     *
     * *Valid values* : `MYSQL` | `POSTGRESQL`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#cfn-rds-dbproxy-enginefamily
     */
    public engineFamily: string;

    /**
     * The Amazon Resource Name (ARN) of the IAM role that the proxy uses to access secrets in AWS Secrets Manager.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#cfn-rds-dbproxy-rolearn
     */
    public roleArn: string;

    /**
     * One or more VPC subnet IDs to associate with the new proxy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#cfn-rds-dbproxy-vpcsubnetids
     */
    public vpcSubnetIds: string[];

    /**
     * Whether the proxy includes detailed information about SQL statements in its logs. This information helps you to debug issues involving SQL behavior or the performance and scalability of the proxy connections. The debug information includes the text of SQL statements that you submit through the proxy. Thus, only enable this setting when needed for debugging, and only when you have security measures in place to safeguard any sensitive information that appears in the logs.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#cfn-rds-dbproxy-debuglogging
     */
    public debugLogging: boolean | cdk.IResolvable | undefined;

    /**
     * The number of seconds that a connection to the proxy can be inactive before the proxy disconnects it. You can set this value higher or lower than the connection timeout limit for the associated database.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#cfn-rds-dbproxy-idleclienttimeout
     */
    public idleClientTimeout: number | undefined;

    /**
     * A Boolean parameter that specifies whether Transport Layer Security (TLS) encryption is required for connections to the proxy. By enabling this setting, you can enforce encrypted TLS connections to the proxy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#cfn-rds-dbproxy-requiretls
     */
    public requireTls: boolean | cdk.IResolvable | undefined;

    /**
     * An optional set of key-value pairs to associate arbitrary data of your choosing with the proxy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#cfn-rds-dbproxy-tags
     */
    public tags: CfnDBProxy.TagFormatProperty[] | undefined;

    /**
     * One or more VPC security group IDs to associate with the new proxy.
     *
     * If you plan to update the resource, don't specify VPC security groups in a shared VPC.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#cfn-rds-dbproxy-vpcsecuritygroupids
     */
    public vpcSecurityGroupIds: string[] | undefined;

    /**
     * Create a new `AWS::RDS::DBProxy`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDBProxyProps) {
        super(scope, id, { type: CfnDBProxy.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'auth', this);
        cdk.requireProperty(props, 'dbProxyName', this);
        cdk.requireProperty(props, 'engineFamily', this);
        cdk.requireProperty(props, 'roleArn', this);
        cdk.requireProperty(props, 'vpcSubnetIds', this);
        this.attrDbProxyArn = cdk.Token.asString(this.getAtt('DBProxyArn'));
        this.attrEndpoint = cdk.Token.asString(this.getAtt('Endpoint'));

        this.auth = props.auth;
        this.dbProxyName = props.dbProxyName;
        this.engineFamily = props.engineFamily;
        this.roleArn = props.roleArn;
        this.vpcSubnetIds = props.vpcSubnetIds;
        this.debugLogging = props.debugLogging;
        this.idleClientTimeout = props.idleClientTimeout;
        this.requireTls = props.requireTls;
        this.tags = props.tags;
        this.vpcSecurityGroupIds = props.vpcSecurityGroupIds;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDBProxy.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            auth: this.auth,
            dbProxyName: this.dbProxyName,
            engineFamily: this.engineFamily,
            roleArn: this.roleArn,
            vpcSubnetIds: this.vpcSubnetIds,
            debugLogging: this.debugLogging,
            idleClientTimeout: this.idleClientTimeout,
            requireTls: this.requireTls,
            tags: this.tags,
            vpcSecurityGroupIds: this.vpcSecurityGroupIds,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDBProxyPropsToCloudFormation(props);
    }
}

export namespace CfnDBProxy {
    /**
     * Specifies the details of authentication used by a proxy to log in as a specific database user.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbproxy-authformat.html
     */
    export interface AuthFormatProperty {
        /**
         * The type of authentication that the proxy uses for connections from the proxy to the underlying database.
         *
         * Valid Values: `SECRETS`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbproxy-authformat.html#cfn-rds-dbproxy-authformat-authscheme
         */
        readonly authScheme?: string;
        /**
         * A user-specified description about the authentication used by a proxy to log in as a specific database user.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbproxy-authformat.html#cfn-rds-dbproxy-authformat-description
         */
        readonly description?: string;
        /**
         * Whether to require or disallow AWS Identity and Access Management (IAM) authentication for connections to the proxy.
         *
         * Valid Values: `DISABLED | REQUIRED`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbproxy-authformat.html#cfn-rds-dbproxy-authformat-iamauth
         */
        readonly iamAuth?: string;
        /**
         * The Amazon Resource Name (ARN) representing the secret that the proxy uses to authenticate to the RDS DB instance or Aurora DB cluster. These secrets are stored within Amazon Secrets Manager.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbproxy-authformat.html#cfn-rds-dbproxy-authformat-secretarn
         */
        readonly secretArn?: string;
        /**
         * The name of the database user to which the proxy connects.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbproxy-authformat.html#cfn-rds-dbproxy-authformat-username
         */
        readonly userName?: string;
    }
}

/**
 * Determine whether the given properties match those of a `AuthFormatProperty`
 *
 * @param properties - the TypeScript properties of a `AuthFormatProperty`
 *
 * @returns the result of the validation.
 */
function CfnDBProxy_AuthFormatPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('authScheme', cdk.validateString)(properties.authScheme));
    errors.collect(cdk.propertyValidator('description', cdk.validateString)(properties.description));
    errors.collect(cdk.propertyValidator('iamAuth', cdk.validateString)(properties.iamAuth));
    errors.collect(cdk.propertyValidator('secretArn', cdk.validateString)(properties.secretArn));
    errors.collect(cdk.propertyValidator('userName', cdk.validateString)(properties.userName));
    return errors.wrap('supplied properties not correct for "AuthFormatProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::DBProxy.AuthFormat` resource
 *
 * @param properties - the TypeScript properties of a `AuthFormatProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::DBProxy.AuthFormat` resource.
 */
// @ts-ignore TS6133
function cfnDBProxyAuthFormatPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDBProxy_AuthFormatPropertyValidator(properties).assertSuccess();
    return {
        AuthScheme: cdk.stringToCloudFormation(properties.authScheme),
        Description: cdk.stringToCloudFormation(properties.description),
        IAMAuth: cdk.stringToCloudFormation(properties.iamAuth),
        SecretArn: cdk.stringToCloudFormation(properties.secretArn),
        UserName: cdk.stringToCloudFormation(properties.userName),
    };
}

// @ts-ignore TS6133
function CfnDBProxyAuthFormatPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDBProxy.AuthFormatProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDBProxy.AuthFormatProperty>();
    ret.addPropertyResult('authScheme', 'AuthScheme', properties.AuthScheme != null ? cfn_parse.FromCloudFormation.getString(properties.AuthScheme) : undefined);
    ret.addPropertyResult('description', 'Description', properties.Description != null ? cfn_parse.FromCloudFormation.getString(properties.Description) : undefined);
    ret.addPropertyResult('iamAuth', 'IAMAuth', properties.IAMAuth != null ? cfn_parse.FromCloudFormation.getString(properties.IAMAuth) : undefined);
    ret.addPropertyResult('secretArn', 'SecretArn', properties.SecretArn != null ? cfn_parse.FromCloudFormation.getString(properties.SecretArn) : undefined);
    ret.addPropertyResult('userName', 'UserName', properties.UserName != null ? cfn_parse.FromCloudFormation.getString(properties.UserName) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnDBProxy {
    /**
     * Metadata assigned to a DB proxy consisting of a key-value pair.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbproxy-tagformat.html
     */
    export interface TagFormatProperty {
        /**
         * A key is the required name of the tag. The string value can be 1-128 Unicode characters in length and can't be prefixed with `aws:` . The string can contain only the set of Unicode letters, digits, white-space, '_', '.', '/', '=', '+', '-' (Java regex: "^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-]*)$").
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbproxy-tagformat.html#cfn-rds-dbproxy-tagformat-key
         */
        readonly key?: string;
        /**
         * A value is the optional value of the tag. The string value can be 1-256 Unicode characters in length and can't be prefixed with `aws:` . The string can contain only the set of Unicode letters, digits, white-space, '_', '.', '/', '=', '+', '-' (Java regex: "^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-]*)$").
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbproxy-tagformat.html#cfn-rds-dbproxy-tagformat-value
         */
        readonly value?: string;
    }
}

/**
 * Determine whether the given properties match those of a `TagFormatProperty`
 *
 * @param properties - the TypeScript properties of a `TagFormatProperty`
 *
 * @returns the result of the validation.
 */
function CfnDBProxy_TagFormatPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "TagFormatProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::DBProxy.TagFormat` resource
 *
 * @param properties - the TypeScript properties of a `TagFormatProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::DBProxy.TagFormat` resource.
 */
// @ts-ignore TS6133
function cfnDBProxyTagFormatPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDBProxy_TagFormatPropertyValidator(properties).assertSuccess();
    return {
        Key: cdk.stringToCloudFormation(properties.key),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnDBProxyTagFormatPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDBProxy.TagFormatProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDBProxy.TagFormatProperty>();
    ret.addPropertyResult('key', 'Key', properties.Key != null ? cfn_parse.FromCloudFormation.getString(properties.Key) : undefined);
    ret.addPropertyResult('value', 'Value', properties.Value != null ? cfn_parse.FromCloudFormation.getString(properties.Value) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnDBProxyEndpoint`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxyendpoint.html
 */
export interface CfnDBProxyEndpointProps {

    /**
     * The name of the DB proxy endpoint to create.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxyendpoint.html#cfn-rds-dbproxyendpoint-dbproxyendpointname
     */
    readonly dbProxyEndpointName: string;

    /**
     * The name of the DB proxy associated with the DB proxy endpoint that you create.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxyendpoint.html#cfn-rds-dbproxyendpoint-dbproxyname
     */
    readonly dbProxyName: string;

    /**
     * The VPC subnet IDs for the DB proxy endpoint that you create. You can specify a different set of subnet IDs than for the original DB proxy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxyendpoint.html#cfn-rds-dbproxyendpoint-vpcsubnetids
     */
    readonly vpcSubnetIds: string[];

    /**
     * An optional set of key-value pairs to associate arbitrary data of your choosing with the proxy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxyendpoint.html#cfn-rds-dbproxyendpoint-tags
     */
    readonly tags?: CfnDBProxyEndpoint.TagFormatProperty[];

    /**
     * A value that indicates whether the DB proxy endpoint can be used for read/write or read-only operations.
     *
     * Valid Values: `READ_WRITE | READ_ONLY`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxyendpoint.html#cfn-rds-dbproxyendpoint-targetrole
     */
    readonly targetRole?: string;

    /**
     * The VPC security group IDs for the DB proxy endpoint that you create. You can specify a different set of security group IDs than for the original DB proxy. The default is the default security group for the VPC.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxyendpoint.html#cfn-rds-dbproxyendpoint-vpcsecuritygroupids
     */
    readonly vpcSecurityGroupIds?: string[];
}

/**
 * Determine whether the given properties match those of a `CfnDBProxyEndpointProps`
 *
 * @param properties - the TypeScript properties of a `CfnDBProxyEndpointProps`
 *
 * @returns the result of the validation.
 */
function CfnDBProxyEndpointPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dbProxyEndpointName', cdk.requiredValidator)(properties.dbProxyEndpointName));
    errors.collect(cdk.propertyValidator('dbProxyEndpointName', cdk.validateString)(properties.dbProxyEndpointName));
    errors.collect(cdk.propertyValidator('dbProxyName', cdk.requiredValidator)(properties.dbProxyName));
    errors.collect(cdk.propertyValidator('dbProxyName', cdk.validateString)(properties.dbProxyName));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(CfnDBProxyEndpoint_TagFormatPropertyValidator))(properties.tags));
    errors.collect(cdk.propertyValidator('targetRole', cdk.validateString)(properties.targetRole));
    errors.collect(cdk.propertyValidator('vpcSecurityGroupIds', cdk.listValidator(cdk.validateString))(properties.vpcSecurityGroupIds));
    errors.collect(cdk.propertyValidator('vpcSubnetIds', cdk.requiredValidator)(properties.vpcSubnetIds));
    errors.collect(cdk.propertyValidator('vpcSubnetIds', cdk.listValidator(cdk.validateString))(properties.vpcSubnetIds));
    return errors.wrap('supplied properties not correct for "CfnDBProxyEndpointProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::DBProxyEndpoint` resource
 *
 * @param properties - the TypeScript properties of a `CfnDBProxyEndpointProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::DBProxyEndpoint` resource.
 */
// @ts-ignore TS6133
function cfnDBProxyEndpointPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDBProxyEndpointPropsValidator(properties).assertSuccess();
    return {
        DBProxyEndpointName: cdk.stringToCloudFormation(properties.dbProxyEndpointName),
        DBProxyName: cdk.stringToCloudFormation(properties.dbProxyName),
        VpcSubnetIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.vpcSubnetIds),
        Tags: cdk.listMapper(cfnDBProxyEndpointTagFormatPropertyToCloudFormation)(properties.tags),
        TargetRole: cdk.stringToCloudFormation(properties.targetRole),
        VpcSecurityGroupIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.vpcSecurityGroupIds),
    };
}

// @ts-ignore TS6133
function CfnDBProxyEndpointPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDBProxyEndpointProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDBProxyEndpointProps>();
    ret.addPropertyResult('dbProxyEndpointName', 'DBProxyEndpointName', cfn_parse.FromCloudFormation.getString(properties.DBProxyEndpointName));
    ret.addPropertyResult('dbProxyName', 'DBProxyName', cfn_parse.FromCloudFormation.getString(properties.DBProxyName));
    ret.addPropertyResult('vpcSubnetIds', 'VpcSubnetIds', cfn_parse.FromCloudFormation.getStringArray(properties.VpcSubnetIds));
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(CfnDBProxyEndpointTagFormatPropertyFromCloudFormation)(properties.Tags) : undefined as any);
    ret.addPropertyResult('targetRole', 'TargetRole', properties.TargetRole != null ? cfn_parse.FromCloudFormation.getString(properties.TargetRole) : undefined);
    ret.addPropertyResult('vpcSecurityGroupIds', 'VpcSecurityGroupIds', properties.VpcSecurityGroupIds != null ? cfn_parse.FromCloudFormation.getStringArray(properties.VpcSecurityGroupIds) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::RDS::DBProxyEndpoint`
 *
 * The `AWS::RDS::DBProxyEndpoint` resource creates or updates a DB proxy endpoint. You can use custom proxy endpoints to access a proxy through a different VPC than the proxy's default VPC.
 *
 * For more information about RDS Proxy, see [AWS::RDS::DBProxy](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html) .
 *
 * @cloudformationResource AWS::RDS::DBProxyEndpoint
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxyendpoint.html
 */
export class CfnDBProxyEndpoint extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::RDS::DBProxyEndpoint";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDBProxyEndpoint {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDBProxyEndpointPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDBProxyEndpoint(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) representing the DB proxy endpoint.
     * @cloudformationAttribute DBProxyEndpointArn
     */
    public readonly attrDbProxyEndpointArn: string;

    /**
     * The custom endpoint for the RDS DB instance or Aurora DB cluster.
     * @cloudformationAttribute Endpoint
     */
    public readonly attrEndpoint: string;

    /**
     * A value that indicates whether this endpoint is the default endpoint for the associated DB proxy. Default DB proxy endpoints always have read/write capability. Other endpoints that you associate with the DB proxy can be either read/write or read-only.
     * @cloudformationAttribute IsDefault
     */
    public readonly attrIsDefault: cdk.IResolvable;

    /**
     * The VPC ID of the DB proxy endpoint.
     * @cloudformationAttribute VpcId
     */
    public readonly attrVpcId: string;

    /**
     * The name of the DB proxy endpoint to create.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxyendpoint.html#cfn-rds-dbproxyendpoint-dbproxyendpointname
     */
    public dbProxyEndpointName: string;

    /**
     * The name of the DB proxy associated with the DB proxy endpoint that you create.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxyendpoint.html#cfn-rds-dbproxyendpoint-dbproxyname
     */
    public dbProxyName: string;

    /**
     * The VPC subnet IDs for the DB proxy endpoint that you create. You can specify a different set of subnet IDs than for the original DB proxy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxyendpoint.html#cfn-rds-dbproxyendpoint-vpcsubnetids
     */
    public vpcSubnetIds: string[];

    /**
     * An optional set of key-value pairs to associate arbitrary data of your choosing with the proxy.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxyendpoint.html#cfn-rds-dbproxyendpoint-tags
     */
    public tags: CfnDBProxyEndpoint.TagFormatProperty[] | undefined;

    /**
     * A value that indicates whether the DB proxy endpoint can be used for read/write or read-only operations.
     *
     * Valid Values: `READ_WRITE | READ_ONLY`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxyendpoint.html#cfn-rds-dbproxyendpoint-targetrole
     */
    public targetRole: string | undefined;

    /**
     * The VPC security group IDs for the DB proxy endpoint that you create. You can specify a different set of security group IDs than for the original DB proxy. The default is the default security group for the VPC.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxyendpoint.html#cfn-rds-dbproxyendpoint-vpcsecuritygroupids
     */
    public vpcSecurityGroupIds: string[] | undefined;

    /**
     * Create a new `AWS::RDS::DBProxyEndpoint`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDBProxyEndpointProps) {
        super(scope, id, { type: CfnDBProxyEndpoint.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'dbProxyEndpointName', this);
        cdk.requireProperty(props, 'dbProxyName', this);
        cdk.requireProperty(props, 'vpcSubnetIds', this);
        this.attrDbProxyEndpointArn = cdk.Token.asString(this.getAtt('DBProxyEndpointArn'));
        this.attrEndpoint = cdk.Token.asString(this.getAtt('Endpoint'));
        this.attrIsDefault = this.getAtt('IsDefault');
        this.attrVpcId = cdk.Token.asString(this.getAtt('VpcId'));

        this.dbProxyEndpointName = props.dbProxyEndpointName;
        this.dbProxyName = props.dbProxyName;
        this.vpcSubnetIds = props.vpcSubnetIds;
        this.tags = props.tags;
        this.targetRole = props.targetRole;
        this.vpcSecurityGroupIds = props.vpcSecurityGroupIds;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDBProxyEndpoint.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            dbProxyEndpointName: this.dbProxyEndpointName,
            dbProxyName: this.dbProxyName,
            vpcSubnetIds: this.vpcSubnetIds,
            tags: this.tags,
            targetRole: this.targetRole,
            vpcSecurityGroupIds: this.vpcSecurityGroupIds,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDBProxyEndpointPropsToCloudFormation(props);
    }
}

export namespace CfnDBProxyEndpoint {
    /**
     * Metadata assigned to a DB proxy endpoint consisting of a key-value pair.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbproxyendpoint-tagformat.html
     */
    export interface TagFormatProperty {
        /**
         * A value is the optional value of the tag. The string value can be 1-256 Unicode characters in length and can't be prefixed with `aws:` . The string can contain only the set of Unicode letters, digits, white-space, '_', '.', '/', '=', '+', '-' (Java regex: "^([\\p{L}\\p{Z}\\p{N}_.:/=+\\-]*)$").
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbproxyendpoint-tagformat.html#cfn-rds-dbproxyendpoint-tagformat-key
         */
        readonly key?: string;
        /**
         * Metadata assigned to a DB instance consisting of a key-value pair.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbproxyendpoint-tagformat.html#cfn-rds-dbproxyendpoint-tagformat-value
         */
        readonly value?: string;
    }
}

/**
 * Determine whether the given properties match those of a `TagFormatProperty`
 *
 * @param properties - the TypeScript properties of a `TagFormatProperty`
 *
 * @returns the result of the validation.
 */
function CfnDBProxyEndpoint_TagFormatPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('key', cdk.validateString)(properties.key));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "TagFormatProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::DBProxyEndpoint.TagFormat` resource
 *
 * @param properties - the TypeScript properties of a `TagFormatProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::DBProxyEndpoint.TagFormat` resource.
 */
// @ts-ignore TS6133
function cfnDBProxyEndpointTagFormatPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDBProxyEndpoint_TagFormatPropertyValidator(properties).assertSuccess();
    return {
        Key: cdk.stringToCloudFormation(properties.key),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnDBProxyEndpointTagFormatPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDBProxyEndpoint.TagFormatProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDBProxyEndpoint.TagFormatProperty>();
    ret.addPropertyResult('key', 'Key', properties.Key != null ? cfn_parse.FromCloudFormation.getString(properties.Key) : undefined);
    ret.addPropertyResult('value', 'Value', properties.Value != null ? cfn_parse.FromCloudFormation.getString(properties.Value) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnDBProxyTargetGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxytargetgroup.html
 */
export interface CfnDBProxyTargetGroupProps {

    /**
     * The identifier of the `DBProxy` that is associated with the `DBProxyTargetGroup` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxytargetgroup.html#cfn-rds-dbproxytargetgroup-dbproxyname
     */
    readonly dbProxyName: string;

    /**
     * The identifier for the target group.
     *
     * > Currently, this property must be set to `default` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxytargetgroup.html#cfn-rds-dbproxytargetgroup-targetgroupname
     */
    readonly targetGroupName: string;

    /**
     * Settings that control the size and behavior of the connection pool associated with a `DBProxyTargetGroup` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxytargetgroup.html#cfn-rds-dbproxytargetgroup-connectionpoolconfigurationinfo
     */
    readonly connectionPoolConfigurationInfo?: CfnDBProxyTargetGroup.ConnectionPoolConfigurationInfoFormatProperty | cdk.IResolvable;

    /**
     * One or more DB cluster identifiers.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxytargetgroup.html#cfn-rds-dbproxytargetgroup-dbclusteridentifiers
     */
    readonly dbClusterIdentifiers?: string[];

    /**
     * One or more DB instance identifiers.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxytargetgroup.html#cfn-rds-dbproxytargetgroup-dbinstanceidentifiers
     */
    readonly dbInstanceIdentifiers?: string[];
}

/**
 * Determine whether the given properties match those of a `CfnDBProxyTargetGroupProps`
 *
 * @param properties - the TypeScript properties of a `CfnDBProxyTargetGroupProps`
 *
 * @returns the result of the validation.
 */
function CfnDBProxyTargetGroupPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('connectionPoolConfigurationInfo', CfnDBProxyTargetGroup_ConnectionPoolConfigurationInfoFormatPropertyValidator)(properties.connectionPoolConfigurationInfo));
    errors.collect(cdk.propertyValidator('dbClusterIdentifiers', cdk.listValidator(cdk.validateString))(properties.dbClusterIdentifiers));
    errors.collect(cdk.propertyValidator('dbInstanceIdentifiers', cdk.listValidator(cdk.validateString))(properties.dbInstanceIdentifiers));
    errors.collect(cdk.propertyValidator('dbProxyName', cdk.requiredValidator)(properties.dbProxyName));
    errors.collect(cdk.propertyValidator('dbProxyName', cdk.validateString)(properties.dbProxyName));
    errors.collect(cdk.propertyValidator('targetGroupName', cdk.requiredValidator)(properties.targetGroupName));
    errors.collect(cdk.propertyValidator('targetGroupName', cdk.validateString)(properties.targetGroupName));
    return errors.wrap('supplied properties not correct for "CfnDBProxyTargetGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::DBProxyTargetGroup` resource
 *
 * @param properties - the TypeScript properties of a `CfnDBProxyTargetGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::DBProxyTargetGroup` resource.
 */
// @ts-ignore TS6133
function cfnDBProxyTargetGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDBProxyTargetGroupPropsValidator(properties).assertSuccess();
    return {
        DBProxyName: cdk.stringToCloudFormation(properties.dbProxyName),
        TargetGroupName: cdk.stringToCloudFormation(properties.targetGroupName),
        ConnectionPoolConfigurationInfo: cfnDBProxyTargetGroupConnectionPoolConfigurationInfoFormatPropertyToCloudFormation(properties.connectionPoolConfigurationInfo),
        DBClusterIdentifiers: cdk.listMapper(cdk.stringToCloudFormation)(properties.dbClusterIdentifiers),
        DBInstanceIdentifiers: cdk.listMapper(cdk.stringToCloudFormation)(properties.dbInstanceIdentifiers),
    };
}

// @ts-ignore TS6133
function CfnDBProxyTargetGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDBProxyTargetGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDBProxyTargetGroupProps>();
    ret.addPropertyResult('dbProxyName', 'DBProxyName', cfn_parse.FromCloudFormation.getString(properties.DBProxyName));
    ret.addPropertyResult('targetGroupName', 'TargetGroupName', cfn_parse.FromCloudFormation.getString(properties.TargetGroupName));
    ret.addPropertyResult('connectionPoolConfigurationInfo', 'ConnectionPoolConfigurationInfo', properties.ConnectionPoolConfigurationInfo != null ? CfnDBProxyTargetGroupConnectionPoolConfigurationInfoFormatPropertyFromCloudFormation(properties.ConnectionPoolConfigurationInfo) : undefined);
    ret.addPropertyResult('dbClusterIdentifiers', 'DBClusterIdentifiers', properties.DBClusterIdentifiers != null ? cfn_parse.FromCloudFormation.getStringArray(properties.DBClusterIdentifiers) : undefined);
    ret.addPropertyResult('dbInstanceIdentifiers', 'DBInstanceIdentifiers', properties.DBInstanceIdentifiers != null ? cfn_parse.FromCloudFormation.getStringArray(properties.DBInstanceIdentifiers) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::RDS::DBProxyTargetGroup`
 *
 * The `AWS::RDS::DBProxyTargetGroup` resource represents a set of RDS DB instances, Aurora DB clusters, or both that a proxy can connect to. Currently, each target group is associated with exactly one RDS DB instance or Aurora DB cluster.
 *
 * This data type is used as a response element in the `DescribeDBProxyTargetGroups` action.
 *
 * For information about RDS Proxy for Amazon RDS, see [Managing Connections with Amazon RDS Proxy](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html) in the *Amazon RDS User Guide* .
 *
 * For information about RDS Proxy for Amazon Aurora, see [Managing Connections with Amazon RDS Proxy](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy.html) in the *Amazon Aurora User Guide* .
 *
 * For a sample template that creates a DB proxy and registers a DB instance, see [Examples](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxy.html#aws-resource-rds-dbproxy--examples) in AWS::RDS::DBProxy.
 *
 * > Limitations apply to RDS Proxy, including DB engine version limitations and AWS Region limitations.
 * >
 * > For information about limitations that apply to RDS Proxy for Amazon RDS, see [Limitations for RDS Proxy](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/rds-proxy.html#rds-proxy.limitations) in the *Amazon RDS User Guide* .
 * >
 * > For information about that apply to RDS Proxy for Amazon Aurora, see [Limitations for RDS Proxy](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/rds-proxy.html#rds-proxy.limitations) in the *Amazon Aurora User Guide* .
 *
 * @cloudformationResource AWS::RDS::DBProxyTargetGroup
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxytargetgroup.html
 */
export class CfnDBProxyTargetGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::RDS::DBProxyTargetGroup";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDBProxyTargetGroup {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDBProxyTargetGroupPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDBProxyTargetGroup(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The Amazon Resource Name (ARN) representing the target group.
     * @cloudformationAttribute TargetGroupArn
     */
    public readonly attrTargetGroupArn: string;

    /**
     * The identifier of the `DBProxy` that is associated with the `DBProxyTargetGroup` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxytargetgroup.html#cfn-rds-dbproxytargetgroup-dbproxyname
     */
    public dbProxyName: string;

    /**
     * The identifier for the target group.
     *
     * > Currently, this property must be set to `default` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxytargetgroup.html#cfn-rds-dbproxytargetgroup-targetgroupname
     */
    public targetGroupName: string;

    /**
     * Settings that control the size and behavior of the connection pool associated with a `DBProxyTargetGroup` .
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxytargetgroup.html#cfn-rds-dbproxytargetgroup-connectionpoolconfigurationinfo
     */
    public connectionPoolConfigurationInfo: CfnDBProxyTargetGroup.ConnectionPoolConfigurationInfoFormatProperty | cdk.IResolvable | undefined;

    /**
     * One or more DB cluster identifiers.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxytargetgroup.html#cfn-rds-dbproxytargetgroup-dbclusteridentifiers
     */
    public dbClusterIdentifiers: string[] | undefined;

    /**
     * One or more DB instance identifiers.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbproxytargetgroup.html#cfn-rds-dbproxytargetgroup-dbinstanceidentifiers
     */
    public dbInstanceIdentifiers: string[] | undefined;

    /**
     * Create a new `AWS::RDS::DBProxyTargetGroup`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDBProxyTargetGroupProps) {
        super(scope, id, { type: CfnDBProxyTargetGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'dbProxyName', this);
        cdk.requireProperty(props, 'targetGroupName', this);
        this.attrTargetGroupArn = cdk.Token.asString(this.getAtt('TargetGroupArn'));

        this.dbProxyName = props.dbProxyName;
        this.targetGroupName = props.targetGroupName;
        this.connectionPoolConfigurationInfo = props.connectionPoolConfigurationInfo;
        this.dbClusterIdentifiers = props.dbClusterIdentifiers;
        this.dbInstanceIdentifiers = props.dbInstanceIdentifiers;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDBProxyTargetGroup.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            dbProxyName: this.dbProxyName,
            targetGroupName: this.targetGroupName,
            connectionPoolConfigurationInfo: this.connectionPoolConfigurationInfo,
            dbClusterIdentifiers: this.dbClusterIdentifiers,
            dbInstanceIdentifiers: this.dbInstanceIdentifiers,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDBProxyTargetGroupPropsToCloudFormation(props);
    }
}

export namespace CfnDBProxyTargetGroup {
    /**
     * Specifies the settings that control the size and behavior of the connection pool associated with a `DBProxyTargetGroup` .
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbproxytargetgroup-connectionpoolconfigurationinfoformat.html
     */
    export interface ConnectionPoolConfigurationInfoFormatProperty {
        /**
         * The number of seconds for a proxy to wait for a connection to become available in the connection pool. Only applies when the proxy has opened its maximum number of connections and all connections are busy with client sessions.
         *
         * Default: 120
         *
         * Constraints: between 1 and 3600, or 0 representing unlimited
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbproxytargetgroup-connectionpoolconfigurationinfoformat.html#cfn-rds-dbproxytargetgroup-connectionpoolconfigurationinfoformat-connectionborrowtimeout
         */
        readonly connectionBorrowTimeout?: number;
        /**
         * One or more SQL statements for the proxy to run when opening each new database connection. Typically used with `SET` statements to make sure that each connection has identical settings such as time zone and character set. For multiple statements, use semicolons as the separator. You can also include multiple variables in a single `SET` statement, such as `SET x=1, y=2` .
         *
         * Default: no initialization query
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbproxytargetgroup-connectionpoolconfigurationinfoformat.html#cfn-rds-dbproxytargetgroup-connectionpoolconfigurationinfoformat-initquery
         */
        readonly initQuery?: string;
        /**
         * The maximum size of the connection pool for each target in a target group. The value is expressed as a percentage of the `max_connections` setting for the RDS DB instance or Aurora DB cluster used by the target group.
         *
         * Default: 100
         *
         * Constraints: between 1 and 100
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbproxytargetgroup-connectionpoolconfigurationinfoformat.html#cfn-rds-dbproxytargetgroup-connectionpoolconfigurationinfoformat-maxconnectionspercent
         */
        readonly maxConnectionsPercent?: number;
        /**
         * Controls how actively the proxy closes idle database connections in the connection pool. The value is expressed as a percentage of the `max_connections` setting for the RDS DB instance or Aurora DB cluster used by the target group. With a high value, the proxy leaves a high percentage of idle database connections open. A low value causes the proxy to close more idle connections and return them to the database.
         *
         * Default: 50
         *
         * Constraints: between 0 and `MaxConnectionsPercent`
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbproxytargetgroup-connectionpoolconfigurationinfoformat.html#cfn-rds-dbproxytargetgroup-connectionpoolconfigurationinfoformat-maxidleconnectionspercent
         */
        readonly maxIdleConnectionsPercent?: number;
        /**
         * Each item in the list represents a class of SQL operations that normally cause all later statements in a session using a proxy to be pinned to the same underlying database connection. Including an item in the list exempts that class of SQL operations from the pinning behavior.
         *
         * Default: no session pinning filters
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-dbproxytargetgroup-connectionpoolconfigurationinfoformat.html#cfn-rds-dbproxytargetgroup-connectionpoolconfigurationinfoformat-sessionpinningfilters
         */
        readonly sessionPinningFilters?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `ConnectionPoolConfigurationInfoFormatProperty`
 *
 * @param properties - the TypeScript properties of a `ConnectionPoolConfigurationInfoFormatProperty`
 *
 * @returns the result of the validation.
 */
function CfnDBProxyTargetGroup_ConnectionPoolConfigurationInfoFormatPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('connectionBorrowTimeout', cdk.validateNumber)(properties.connectionBorrowTimeout));
    errors.collect(cdk.propertyValidator('initQuery', cdk.validateString)(properties.initQuery));
    errors.collect(cdk.propertyValidator('maxConnectionsPercent', cdk.validateNumber)(properties.maxConnectionsPercent));
    errors.collect(cdk.propertyValidator('maxIdleConnectionsPercent', cdk.validateNumber)(properties.maxIdleConnectionsPercent));
    errors.collect(cdk.propertyValidator('sessionPinningFilters', cdk.listValidator(cdk.validateString))(properties.sessionPinningFilters));
    return errors.wrap('supplied properties not correct for "ConnectionPoolConfigurationInfoFormatProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::DBProxyTargetGroup.ConnectionPoolConfigurationInfoFormat` resource
 *
 * @param properties - the TypeScript properties of a `ConnectionPoolConfigurationInfoFormatProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::DBProxyTargetGroup.ConnectionPoolConfigurationInfoFormat` resource.
 */
// @ts-ignore TS6133
function cfnDBProxyTargetGroupConnectionPoolConfigurationInfoFormatPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDBProxyTargetGroup_ConnectionPoolConfigurationInfoFormatPropertyValidator(properties).assertSuccess();
    return {
        ConnectionBorrowTimeout: cdk.numberToCloudFormation(properties.connectionBorrowTimeout),
        InitQuery: cdk.stringToCloudFormation(properties.initQuery),
        MaxConnectionsPercent: cdk.numberToCloudFormation(properties.maxConnectionsPercent),
        MaxIdleConnectionsPercent: cdk.numberToCloudFormation(properties.maxIdleConnectionsPercent),
        SessionPinningFilters: cdk.listMapper(cdk.stringToCloudFormation)(properties.sessionPinningFilters),
    };
}

// @ts-ignore TS6133
function CfnDBProxyTargetGroupConnectionPoolConfigurationInfoFormatPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDBProxyTargetGroup.ConnectionPoolConfigurationInfoFormatProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDBProxyTargetGroup.ConnectionPoolConfigurationInfoFormatProperty>();
    ret.addPropertyResult('connectionBorrowTimeout', 'ConnectionBorrowTimeout', properties.ConnectionBorrowTimeout != null ? cfn_parse.FromCloudFormation.getNumber(properties.ConnectionBorrowTimeout) : undefined);
    ret.addPropertyResult('initQuery', 'InitQuery', properties.InitQuery != null ? cfn_parse.FromCloudFormation.getString(properties.InitQuery) : undefined);
    ret.addPropertyResult('maxConnectionsPercent', 'MaxConnectionsPercent', properties.MaxConnectionsPercent != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxConnectionsPercent) : undefined);
    ret.addPropertyResult('maxIdleConnectionsPercent', 'MaxIdleConnectionsPercent', properties.MaxIdleConnectionsPercent != null ? cfn_parse.FromCloudFormation.getNumber(properties.MaxIdleConnectionsPercent) : undefined);
    ret.addPropertyResult('sessionPinningFilters', 'SessionPinningFilters', properties.SessionPinningFilters != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SessionPinningFilters) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnDBSecurityGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-security-group.html
 */
export interface CfnDBSecurityGroupProps {

    /**
     * Ingress rules to be applied to the DB security group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-security-group.html#cfn-rds-dbsecuritygroup-dbsecuritygroupingress
     */
    readonly dbSecurityGroupIngress: Array<CfnDBSecurityGroup.IngressProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * Provides the description of the DB security group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-security-group.html#cfn-rds-dbsecuritygroup-groupdescription
     */
    readonly groupDescription: string;

    /**
     * The identifier of an Amazon VPC. This property indicates the VPC that this DB security group belongs to.
     *
     * > The `EC2VpcId` property is for backward compatibility with older regions, and is no longer recommended for providing security information to an RDS DB instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-security-group.html#cfn-rds-dbsecuritygroup-ec2vpcid
     */
    readonly ec2VpcId?: string;

    /**
     * Tags to assign to the DB security group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-security-group.html#cfn-rds-dbsecuritygroup-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnDBSecurityGroupProps`
 *
 * @param properties - the TypeScript properties of a `CfnDBSecurityGroupProps`
 *
 * @returns the result of the validation.
 */
function CfnDBSecurityGroupPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dbSecurityGroupIngress', cdk.requiredValidator)(properties.dbSecurityGroupIngress));
    errors.collect(cdk.propertyValidator('dbSecurityGroupIngress', cdk.listValidator(CfnDBSecurityGroup_IngressPropertyValidator))(properties.dbSecurityGroupIngress));
    errors.collect(cdk.propertyValidator('ec2VpcId', cdk.validateString)(properties.ec2VpcId));
    errors.collect(cdk.propertyValidator('groupDescription', cdk.requiredValidator)(properties.groupDescription));
    errors.collect(cdk.propertyValidator('groupDescription', cdk.validateString)(properties.groupDescription));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnDBSecurityGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::DBSecurityGroup` resource
 *
 * @param properties - the TypeScript properties of a `CfnDBSecurityGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::DBSecurityGroup` resource.
 */
// @ts-ignore TS6133
function cfnDBSecurityGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDBSecurityGroupPropsValidator(properties).assertSuccess();
    return {
        DBSecurityGroupIngress: cdk.listMapper(cfnDBSecurityGroupIngressPropertyToCloudFormation)(properties.dbSecurityGroupIngress),
        GroupDescription: cdk.stringToCloudFormation(properties.groupDescription),
        EC2VpcId: cdk.stringToCloudFormation(properties.ec2VpcId),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnDBSecurityGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDBSecurityGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDBSecurityGroupProps>();
    ret.addPropertyResult('dbSecurityGroupIngress', 'DBSecurityGroupIngress', cfn_parse.FromCloudFormation.getArray(CfnDBSecurityGroupIngressPropertyFromCloudFormation)(properties.DBSecurityGroupIngress));
    ret.addPropertyResult('groupDescription', 'GroupDescription', cfn_parse.FromCloudFormation.getString(properties.GroupDescription));
    ret.addPropertyResult('ec2VpcId', 'EC2VpcId', properties.EC2VpcId != null ? cfn_parse.FromCloudFormation.getString(properties.EC2VpcId) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::RDS::DBSecurityGroup`
 *
 * The `AWS::RDS::DBSecurityGroup` resource creates or updates an Amazon RDS DB security group.
 *
 * > DB security groups are a part of the EC2-Classic Platform and as such are not supported in all regions. It is advised to use the `AWS::EC2::SecurityGroup` resource in those regions instead. To determine which platform you are on, see [Determining Whether You Are Using the EC2-VPC or EC2-Classic Platform](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.FindDefaultVPC.html) . For more information on the `AWS::EC2::SecurityGroup` , see the documentation for [EC2 security groups](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-ec2-security-group.html) .
 *
 * @cloudformationResource AWS::RDS::DBSecurityGroup
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-security-group.html
 */
export class CfnDBSecurityGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::RDS::DBSecurityGroup";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDBSecurityGroup {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDBSecurityGroupPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDBSecurityGroup(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Ingress rules to be applied to the DB security group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-security-group.html#cfn-rds-dbsecuritygroup-dbsecuritygroupingress
     */
    public dbSecurityGroupIngress: Array<CfnDBSecurityGroup.IngressProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * Provides the description of the DB security group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-security-group.html#cfn-rds-dbsecuritygroup-groupdescription
     */
    public groupDescription: string;

    /**
     * The identifier of an Amazon VPC. This property indicates the VPC that this DB security group belongs to.
     *
     * > The `EC2VpcId` property is for backward compatibility with older regions, and is no longer recommended for providing security information to an RDS DB instance.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-security-group.html#cfn-rds-dbsecuritygroup-ec2vpcid
     */
    public ec2VpcId: string | undefined;

    /**
     * Tags to assign to the DB security group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-security-group.html#cfn-rds-dbsecuritygroup-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::RDS::DBSecurityGroup`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDBSecurityGroupProps) {
        super(scope, id, { type: CfnDBSecurityGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'dbSecurityGroupIngress', this);
        cdk.requireProperty(props, 'groupDescription', this);

        this.dbSecurityGroupIngress = props.dbSecurityGroupIngress;
        this.groupDescription = props.groupDescription;
        this.ec2VpcId = props.ec2VpcId;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::RDS::DBSecurityGroup", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDBSecurityGroup.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            dbSecurityGroupIngress: this.dbSecurityGroupIngress,
            groupDescription: this.groupDescription,
            ec2VpcId: this.ec2VpcId,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDBSecurityGroupPropsToCloudFormation(props);
    }
}

export namespace CfnDBSecurityGroup {
    /**
     * The `Ingress` property type specifies an individual ingress rule within an `AWS::RDS::DBSecurityGroup` resource.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-security-group-rule.html
     */
    export interface IngressProperty {
        /**
         * The IP range to authorize.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-security-group-rule.html#cfn-rds-securitygroup-cidrip
         */
        readonly cidrip?: string;
        /**
         * Id of the EC2 security group to authorize. For VPC DB security groups, `EC2SecurityGroupId` must be provided. Otherwise, `EC2SecurityGroupOwnerId` and either `EC2SecurityGroupName` or `EC2SecurityGroupId` must be provided.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-security-group-rule.html#cfn-rds-securitygroup-ec2securitygroupid
         */
        readonly ec2SecurityGroupId?: string;
        /**
         * Name of the EC2 security group to authorize. For VPC DB security groups, `EC2SecurityGroupId` must be provided. Otherwise, `EC2SecurityGroupOwnerId` and either `EC2SecurityGroupName` or `EC2SecurityGroupId` must be provided.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-security-group-rule.html#cfn-rds-securitygroup-ec2securitygroupname
         */
        readonly ec2SecurityGroupName?: string;
        /**
         * AWS account number of the owner of the EC2 security group specified in the `EC2SecurityGroupName` parameter. The AWS access key ID isn't an acceptable value. For VPC DB security groups, `EC2SecurityGroupId` must be provided. Otherwise, `EC2SecurityGroupOwnerId` and either `EC2SecurityGroupName` or `EC2SecurityGroupId` must be provided.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-security-group-rule.html#cfn-rds-securitygroup-ec2securitygroupownerid
         */
        readonly ec2SecurityGroupOwnerId?: string;
    }
}

/**
 * Determine whether the given properties match those of a `IngressProperty`
 *
 * @param properties - the TypeScript properties of a `IngressProperty`
 *
 * @returns the result of the validation.
 */
function CfnDBSecurityGroup_IngressPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('cidrip', cdk.validateString)(properties.cidrip));
    errors.collect(cdk.propertyValidator('ec2SecurityGroupId', cdk.validateString)(properties.ec2SecurityGroupId));
    errors.collect(cdk.propertyValidator('ec2SecurityGroupName', cdk.validateString)(properties.ec2SecurityGroupName));
    errors.collect(cdk.propertyValidator('ec2SecurityGroupOwnerId', cdk.validateString)(properties.ec2SecurityGroupOwnerId));
    return errors.wrap('supplied properties not correct for "IngressProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::DBSecurityGroup.Ingress` resource
 *
 * @param properties - the TypeScript properties of a `IngressProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::DBSecurityGroup.Ingress` resource.
 */
// @ts-ignore TS6133
function cfnDBSecurityGroupIngressPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDBSecurityGroup_IngressPropertyValidator(properties).assertSuccess();
    return {
        CIDRIP: cdk.stringToCloudFormation(properties.cidrip),
        EC2SecurityGroupId: cdk.stringToCloudFormation(properties.ec2SecurityGroupId),
        EC2SecurityGroupName: cdk.stringToCloudFormation(properties.ec2SecurityGroupName),
        EC2SecurityGroupOwnerId: cdk.stringToCloudFormation(properties.ec2SecurityGroupOwnerId),
    };
}

// @ts-ignore TS6133
function CfnDBSecurityGroupIngressPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDBSecurityGroup.IngressProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDBSecurityGroup.IngressProperty>();
    ret.addPropertyResult('cidrip', 'CIDRIP', properties.CIDRIP != null ? cfn_parse.FromCloudFormation.getString(properties.CIDRIP) : undefined);
    ret.addPropertyResult('ec2SecurityGroupId', 'EC2SecurityGroupId', properties.EC2SecurityGroupId != null ? cfn_parse.FromCloudFormation.getString(properties.EC2SecurityGroupId) : undefined);
    ret.addPropertyResult('ec2SecurityGroupName', 'EC2SecurityGroupName', properties.EC2SecurityGroupName != null ? cfn_parse.FromCloudFormation.getString(properties.EC2SecurityGroupName) : undefined);
    ret.addPropertyResult('ec2SecurityGroupOwnerId', 'EC2SecurityGroupOwnerId', properties.EC2SecurityGroupOwnerId != null ? cfn_parse.FromCloudFormation.getString(properties.EC2SecurityGroupOwnerId) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * Properties for defining a `CfnDBSecurityGroupIngress`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-security-group-ingress.html
 */
export interface CfnDBSecurityGroupIngressProps {

    /**
     * The name of the DB security group to add authorization to.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-security-group-ingress.html#cfn-rds-securitygroup-ingress-dbsecuritygroupname
     */
    readonly dbSecurityGroupName: string;

    /**
     * The IP range to authorize.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-security-group-ingress.html#cfn-rds-securitygroup-ingress-cidrip
     */
    readonly cidrip?: string;

    /**
     * Id of the EC2 security group to authorize. For VPC DB security groups, `EC2SecurityGroupId` must be provided. Otherwise, `EC2SecurityGroupOwnerId` and either `EC2SecurityGroupName` or `EC2SecurityGroupId` must be provided.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-security-group-ingress.html#cfn-rds-securitygroup-ingress-ec2securitygroupid
     */
    readonly ec2SecurityGroupId?: string;

    /**
     * Name of the EC2 security group to authorize. For VPC DB security groups, `EC2SecurityGroupId` must be provided. Otherwise, `EC2SecurityGroupOwnerId` and either `EC2SecurityGroupName` or `EC2SecurityGroupId` must be provided.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-security-group-ingress.html#cfn-rds-securitygroup-ingress-ec2securitygroupname
     */
    readonly ec2SecurityGroupName?: string;

    /**
     * AWS account number of the owner of the EC2 security group specified in the `EC2SecurityGroupName` parameter. The AWS access key ID isn't an acceptable value. For VPC DB security groups, `EC2SecurityGroupId` must be provided. Otherwise, `EC2SecurityGroupOwnerId` and either `EC2SecurityGroupName` or `EC2SecurityGroupId` must be provided.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-security-group-ingress.html#cfn-rds-securitygroup-ingress-ec2securitygroupownerid
     */
    readonly ec2SecurityGroupOwnerId?: string;
}

/**
 * Determine whether the given properties match those of a `CfnDBSecurityGroupIngressProps`
 *
 * @param properties - the TypeScript properties of a `CfnDBSecurityGroupIngressProps`
 *
 * @returns the result of the validation.
 */
function CfnDBSecurityGroupIngressPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('cidrip', cdk.validateString)(properties.cidrip));
    errors.collect(cdk.propertyValidator('dbSecurityGroupName', cdk.requiredValidator)(properties.dbSecurityGroupName));
    errors.collect(cdk.propertyValidator('dbSecurityGroupName', cdk.validateString)(properties.dbSecurityGroupName));
    errors.collect(cdk.propertyValidator('ec2SecurityGroupId', cdk.validateString)(properties.ec2SecurityGroupId));
    errors.collect(cdk.propertyValidator('ec2SecurityGroupName', cdk.validateString)(properties.ec2SecurityGroupName));
    errors.collect(cdk.propertyValidator('ec2SecurityGroupOwnerId', cdk.validateString)(properties.ec2SecurityGroupOwnerId));
    return errors.wrap('supplied properties not correct for "CfnDBSecurityGroupIngressProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::DBSecurityGroupIngress` resource
 *
 * @param properties - the TypeScript properties of a `CfnDBSecurityGroupIngressProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::DBSecurityGroupIngress` resource.
 */
// @ts-ignore TS6133
function cfnDBSecurityGroupIngressPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDBSecurityGroupIngressPropsValidator(properties).assertSuccess();
    return {
        DBSecurityGroupName: cdk.stringToCloudFormation(properties.dbSecurityGroupName),
        CIDRIP: cdk.stringToCloudFormation(properties.cidrip),
        EC2SecurityGroupId: cdk.stringToCloudFormation(properties.ec2SecurityGroupId),
        EC2SecurityGroupName: cdk.stringToCloudFormation(properties.ec2SecurityGroupName),
        EC2SecurityGroupOwnerId: cdk.stringToCloudFormation(properties.ec2SecurityGroupOwnerId),
    };
}

// @ts-ignore TS6133
function CfnDBSecurityGroupIngressPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDBSecurityGroupIngressProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDBSecurityGroupIngressProps>();
    ret.addPropertyResult('dbSecurityGroupName', 'DBSecurityGroupName', cfn_parse.FromCloudFormation.getString(properties.DBSecurityGroupName));
    ret.addPropertyResult('cidrip', 'CIDRIP', properties.CIDRIP != null ? cfn_parse.FromCloudFormation.getString(properties.CIDRIP) : undefined);
    ret.addPropertyResult('ec2SecurityGroupId', 'EC2SecurityGroupId', properties.EC2SecurityGroupId != null ? cfn_parse.FromCloudFormation.getString(properties.EC2SecurityGroupId) : undefined);
    ret.addPropertyResult('ec2SecurityGroupName', 'EC2SecurityGroupName', properties.EC2SecurityGroupName != null ? cfn_parse.FromCloudFormation.getString(properties.EC2SecurityGroupName) : undefined);
    ret.addPropertyResult('ec2SecurityGroupOwnerId', 'EC2SecurityGroupOwnerId', properties.EC2SecurityGroupOwnerId != null ? cfn_parse.FromCloudFormation.getString(properties.EC2SecurityGroupOwnerId) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::RDS::DBSecurityGroupIngress`
 *
 * The `AWS::RDS::DBSecurityGroupIngress` resource enables ingress to a DB security group using one of two forms of authorization. First, you can add EC2 or VPC security groups to the DB security group if the application using the database is running on EC2 or VPC instances. Second, IP ranges are available if the application accessing your database is running on the Internet.
 *
 * This type supports updates. For more information about updating stacks, see [AWS CloudFormation Stacks Updates](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks.html) .
 *
 * For details about the settings for DB security group ingress, see [AuthorizeDBSecurityGroupIngress](https://docs.aws.amazon.com/AmazonRDS/latest/APIReference/API_AuthorizeDBSecurityGroupIngress.html) .
 *
 * @cloudformationResource AWS::RDS::DBSecurityGroupIngress
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-security-group-ingress.html
 */
export class CfnDBSecurityGroupIngress extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::RDS::DBSecurityGroupIngress";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDBSecurityGroupIngress {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDBSecurityGroupIngressPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDBSecurityGroupIngress(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The name of the DB security group to add authorization to.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-security-group-ingress.html#cfn-rds-securitygroup-ingress-dbsecuritygroupname
     */
    public dbSecurityGroupName: string;

    /**
     * The IP range to authorize.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-security-group-ingress.html#cfn-rds-securitygroup-ingress-cidrip
     */
    public cidrip: string | undefined;

    /**
     * Id of the EC2 security group to authorize. For VPC DB security groups, `EC2SecurityGroupId` must be provided. Otherwise, `EC2SecurityGroupOwnerId` and either `EC2SecurityGroupName` or `EC2SecurityGroupId` must be provided.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-security-group-ingress.html#cfn-rds-securitygroup-ingress-ec2securitygroupid
     */
    public ec2SecurityGroupId: string | undefined;

    /**
     * Name of the EC2 security group to authorize. For VPC DB security groups, `EC2SecurityGroupId` must be provided. Otherwise, `EC2SecurityGroupOwnerId` and either `EC2SecurityGroupName` or `EC2SecurityGroupId` must be provided.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-security-group-ingress.html#cfn-rds-securitygroup-ingress-ec2securitygroupname
     */
    public ec2SecurityGroupName: string | undefined;

    /**
     * AWS account number of the owner of the EC2 security group specified in the `EC2SecurityGroupName` parameter. The AWS access key ID isn't an acceptable value. For VPC DB security groups, `EC2SecurityGroupId` must be provided. Otherwise, `EC2SecurityGroupOwnerId` and either `EC2SecurityGroupName` or `EC2SecurityGroupId` must be provided.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-security-group-ingress.html#cfn-rds-securitygroup-ingress-ec2securitygroupownerid
     */
    public ec2SecurityGroupOwnerId: string | undefined;

    /**
     * Create a new `AWS::RDS::DBSecurityGroupIngress`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDBSecurityGroupIngressProps) {
        super(scope, id, { type: CfnDBSecurityGroupIngress.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'dbSecurityGroupName', this);

        this.dbSecurityGroupName = props.dbSecurityGroupName;
        this.cidrip = props.cidrip;
        this.ec2SecurityGroupId = props.ec2SecurityGroupId;
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
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDBSecurityGroupIngress.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            dbSecurityGroupName: this.dbSecurityGroupName,
            cidrip: this.cidrip,
            ec2SecurityGroupId: this.ec2SecurityGroupId,
            ec2SecurityGroupName: this.ec2SecurityGroupName,
            ec2SecurityGroupOwnerId: this.ec2SecurityGroupOwnerId,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDBSecurityGroupIngressPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnDBSubnetGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbsubnet-group.html
 */
export interface CfnDBSubnetGroupProps {

    /**
     * The description for the DB subnet group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbsubnet-group.html#cfn-rds-dbsubnetgroup-dbsubnetgroupdescription
     */
    readonly dbSubnetGroupDescription: string;

    /**
     * The EC2 Subnet IDs for the DB subnet group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbsubnet-group.html#cfn-rds-dbsubnetgroup-subnetids
     */
    readonly subnetIds: string[];

    /**
     * The name for the DB subnet group. This value is stored as a lowercase string.
     *
     * Constraints: Must contain no more than 255 lowercase alphanumeric characters or hyphens. Must not be "Default".
     *
     * Example: `mysubnetgroup`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbsubnet-group.html#cfn-rds-dbsubnetgroup-dbsubnetgroupname
     */
    readonly dbSubnetGroupName?: string;

    /**
     * Tags to assign to the DB subnet group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbsubnet-group.html#cfn-rds-dbsubnetgroup-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnDBSubnetGroupProps`
 *
 * @param properties - the TypeScript properties of a `CfnDBSubnetGroupProps`
 *
 * @returns the result of the validation.
 */
function CfnDBSubnetGroupPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dbSubnetGroupDescription', cdk.requiredValidator)(properties.dbSubnetGroupDescription));
    errors.collect(cdk.propertyValidator('dbSubnetGroupDescription', cdk.validateString)(properties.dbSubnetGroupDescription));
    errors.collect(cdk.propertyValidator('dbSubnetGroupName', cdk.validateString)(properties.dbSubnetGroupName));
    errors.collect(cdk.propertyValidator('subnetIds', cdk.requiredValidator)(properties.subnetIds));
    errors.collect(cdk.propertyValidator('subnetIds', cdk.listValidator(cdk.validateString))(properties.subnetIds));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnDBSubnetGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::DBSubnetGroup` resource
 *
 * @param properties - the TypeScript properties of a `CfnDBSubnetGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::DBSubnetGroup` resource.
 */
// @ts-ignore TS6133
function cfnDBSubnetGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnDBSubnetGroupPropsValidator(properties).assertSuccess();
    return {
        DBSubnetGroupDescription: cdk.stringToCloudFormation(properties.dbSubnetGroupDescription),
        SubnetIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.subnetIds),
        DBSubnetGroupName: cdk.stringToCloudFormation(properties.dbSubnetGroupName),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnDBSubnetGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnDBSubnetGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnDBSubnetGroupProps>();
    ret.addPropertyResult('dbSubnetGroupDescription', 'DBSubnetGroupDescription', cfn_parse.FromCloudFormation.getString(properties.DBSubnetGroupDescription));
    ret.addPropertyResult('subnetIds', 'SubnetIds', cfn_parse.FromCloudFormation.getStringArray(properties.SubnetIds));
    ret.addPropertyResult('dbSubnetGroupName', 'DBSubnetGroupName', properties.DBSubnetGroupName != null ? cfn_parse.FromCloudFormation.getString(properties.DBSubnetGroupName) : undefined);
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::RDS::DBSubnetGroup`
 *
 * The `AWS::RDS::DBSubnetGroup` resource creates a database subnet group. Subnet groups must contain at least two subnets in two different Availability Zones in the same region.
 *
 * For more information, see [Working with DB subnet groups](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_VPC.WorkingWithRDSInstanceinaVPC.html#USER_VPC.Subnets) in the *Amazon RDS User Guide* .
 *
 * @cloudformationResource AWS::RDS::DBSubnetGroup
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbsubnet-group.html
 */
export class CfnDBSubnetGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::RDS::DBSubnetGroup";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnDBSubnetGroup {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnDBSubnetGroupPropsFromCloudFormation(resourceProperties);
        const ret = new CfnDBSubnetGroup(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The description for the DB subnet group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbsubnet-group.html#cfn-rds-dbsubnetgroup-dbsubnetgroupdescription
     */
    public dbSubnetGroupDescription: string;

    /**
     * The EC2 Subnet IDs for the DB subnet group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbsubnet-group.html#cfn-rds-dbsubnetgroup-subnetids
     */
    public subnetIds: string[];

    /**
     * The name for the DB subnet group. This value is stored as a lowercase string.
     *
     * Constraints: Must contain no more than 255 lowercase alphanumeric characters or hyphens. Must not be "Default".
     *
     * Example: `mysubnetgroup`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbsubnet-group.html#cfn-rds-dbsubnetgroup-dbsubnetgroupname
     */
    public dbSubnetGroupName: string | undefined;

    /**
     * Tags to assign to the DB subnet group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-dbsubnet-group.html#cfn-rds-dbsubnetgroup-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::RDS::DBSubnetGroup`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnDBSubnetGroupProps) {
        super(scope, id, { type: CfnDBSubnetGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'dbSubnetGroupDescription', this);
        cdk.requireProperty(props, 'subnetIds', this);

        this.dbSubnetGroupDescription = props.dbSubnetGroupDescription;
        this.subnetIds = props.subnetIds;
        this.dbSubnetGroupName = props.dbSubnetGroupName;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::RDS::DBSubnetGroup", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnDBSubnetGroup.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            dbSubnetGroupDescription: this.dbSubnetGroupDescription,
            subnetIds: this.subnetIds,
            dbSubnetGroupName: this.dbSubnetGroupName,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnDBSubnetGroupPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnEventSubscription`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-eventsubscription.html
 */
export interface CfnEventSubscriptionProps {

    /**
     * The Amazon Resource Name (ARN) of the SNS topic created for event notification. The ARN is created by Amazon SNS when you create a topic and subscribe to it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-eventsubscription.html#cfn-rds-eventsubscription-snstopicarn
     */
    readonly snsTopicArn: string;

    /**
     * A value that indicates whether to activate the subscription. If the event notification subscription isn't activated, the subscription is created but not active.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-eventsubscription.html#cfn-rds-eventsubscription-enabled
     */
    readonly enabled?: boolean | cdk.IResolvable;

    /**
     * A list of event categories for a particular source type ( `SourceType` ) that you want to subscribe to. You can see a list of the categories for a given source type in the "Amazon RDS event categories and event messages" section of the [*Amazon RDS User Guide*](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Events.Messages.html) or the [*Amazon Aurora User Guide*](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_Events.Messages.html) . You can also see this list by using the `DescribeEventCategories` operation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-eventsubscription.html#cfn-rds-eventsubscription-eventcategories
     */
    readonly eventCategories?: string[];

    /**
     * The list of identifiers of the event sources for which events are returned. If not specified, then all sources are included in the response. An identifier must begin with a letter and must contain only ASCII letters, digits, and hyphens. It can't end with a hyphen or contain two consecutive hyphens.
     *
     * Constraints:
     *
     * - If a `SourceIds` value is supplied, `SourceType` must also be provided.
     * - If the source type is a DB instance, a `DBInstanceIdentifier` value must be supplied.
     * - If the source type is a DB cluster, a `DBClusterIdentifier` value must be supplied.
     * - If the source type is a DB parameter group, a `DBParameterGroupName` value must be supplied.
     * - If the source type is a DB security group, a `DBSecurityGroupName` value must be supplied.
     * - If the source type is a DB snapshot, a `DBSnapshotIdentifier` value must be supplied.
     * - If the source type is a DB cluster snapshot, a `DBClusterSnapshotIdentifier` value must be supplied.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-eventsubscription.html#cfn-rds-eventsubscription-sourceids
     */
    readonly sourceIds?: string[];

    /**
     * The type of source that is generating the events. For example, if you want to be notified of events generated by a DB instance, set this parameter to `db-instance` . If this value isn't specified, all events are returned.
     *
     * Valid values: `db-instance` | `db-cluster` | `db-parameter-group` | `db-security-group` | `db-snapshot` | `db-cluster-snapshot`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-eventsubscription.html#cfn-rds-eventsubscription-sourcetype
     */
    readonly sourceType?: string;
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
    errors.collect(cdk.propertyValidator('snsTopicArn', cdk.requiredValidator)(properties.snsTopicArn));
    errors.collect(cdk.propertyValidator('snsTopicArn', cdk.validateString)(properties.snsTopicArn));
    errors.collect(cdk.propertyValidator('sourceIds', cdk.listValidator(cdk.validateString))(properties.sourceIds));
    errors.collect(cdk.propertyValidator('sourceType', cdk.validateString)(properties.sourceType));
    return errors.wrap('supplied properties not correct for "CfnEventSubscriptionProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::EventSubscription` resource
 *
 * @param properties - the TypeScript properties of a `CfnEventSubscriptionProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::EventSubscription` resource.
 */
// @ts-ignore TS6133
function cfnEventSubscriptionPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnEventSubscriptionPropsValidator(properties).assertSuccess();
    return {
        SnsTopicArn: cdk.stringToCloudFormation(properties.snsTopicArn),
        Enabled: cdk.booleanToCloudFormation(properties.enabled),
        EventCategories: cdk.listMapper(cdk.stringToCloudFormation)(properties.eventCategories),
        SourceIds: cdk.listMapper(cdk.stringToCloudFormation)(properties.sourceIds),
        SourceType: cdk.stringToCloudFormation(properties.sourceType),
    };
}

// @ts-ignore TS6133
function CfnEventSubscriptionPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnEventSubscriptionProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnEventSubscriptionProps>();
    ret.addPropertyResult('snsTopicArn', 'SnsTopicArn', cfn_parse.FromCloudFormation.getString(properties.SnsTopicArn));
    ret.addPropertyResult('enabled', 'Enabled', properties.Enabled != null ? cfn_parse.FromCloudFormation.getBoolean(properties.Enabled) : undefined);
    ret.addPropertyResult('eventCategories', 'EventCategories', properties.EventCategories != null ? cfn_parse.FromCloudFormation.getStringArray(properties.EventCategories) : undefined);
    ret.addPropertyResult('sourceIds', 'SourceIds', properties.SourceIds != null ? cfn_parse.FromCloudFormation.getStringArray(properties.SourceIds) : undefined);
    ret.addPropertyResult('sourceType', 'SourceType', properties.SourceType != null ? cfn_parse.FromCloudFormation.getString(properties.SourceType) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::RDS::EventSubscription`
 *
 * The `AWS::RDS::EventSubscription` resource allows you to receive notifications for Amazon Relational Database Service events through the Amazon Simple Notification Service (Amazon SNS). For more information, see [Using Amazon RDS Event Notification](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Events.html) in the *Amazon RDS User Guide* .
 *
 * @cloudformationResource AWS::RDS::EventSubscription
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-eventsubscription.html
 */
export class CfnEventSubscription extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::RDS::EventSubscription";

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
     * The Amazon Resource Name (ARN) of the SNS topic created for event notification. The ARN is created by Amazon SNS when you create a topic and subscribe to it.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-eventsubscription.html#cfn-rds-eventsubscription-snstopicarn
     */
    public snsTopicArn: string;

    /**
     * A value that indicates whether to activate the subscription. If the event notification subscription isn't activated, the subscription is created but not active.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-eventsubscription.html#cfn-rds-eventsubscription-enabled
     */
    public enabled: boolean | cdk.IResolvable | undefined;

    /**
     * A list of event categories for a particular source type ( `SourceType` ) that you want to subscribe to. You can see a list of the categories for a given source type in the "Amazon RDS event categories and event messages" section of the [*Amazon RDS User Guide*](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_Events.Messages.html) or the [*Amazon Aurora User Guide*](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/USER_Events.Messages.html) . You can also see this list by using the `DescribeEventCategories` operation.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-eventsubscription.html#cfn-rds-eventsubscription-eventcategories
     */
    public eventCategories: string[] | undefined;

    /**
     * The list of identifiers of the event sources for which events are returned. If not specified, then all sources are included in the response. An identifier must begin with a letter and must contain only ASCII letters, digits, and hyphens. It can't end with a hyphen or contain two consecutive hyphens.
     *
     * Constraints:
     *
     * - If a `SourceIds` value is supplied, `SourceType` must also be provided.
     * - If the source type is a DB instance, a `DBInstanceIdentifier` value must be supplied.
     * - If the source type is a DB cluster, a `DBClusterIdentifier` value must be supplied.
     * - If the source type is a DB parameter group, a `DBParameterGroupName` value must be supplied.
     * - If the source type is a DB security group, a `DBSecurityGroupName` value must be supplied.
     * - If the source type is a DB snapshot, a `DBSnapshotIdentifier` value must be supplied.
     * - If the source type is a DB cluster snapshot, a `DBClusterSnapshotIdentifier` value must be supplied.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-eventsubscription.html#cfn-rds-eventsubscription-sourceids
     */
    public sourceIds: string[] | undefined;

    /**
     * The type of source that is generating the events. For example, if you want to be notified of events generated by a DB instance, set this parameter to `db-instance` . If this value isn't specified, all events are returned.
     *
     * Valid values: `db-instance` | `db-cluster` | `db-parameter-group` | `db-security-group` | `db-snapshot` | `db-cluster-snapshot`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-eventsubscription.html#cfn-rds-eventsubscription-sourcetype
     */
    public sourceType: string | undefined;

    /**
     * Create a new `AWS::RDS::EventSubscription`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnEventSubscriptionProps) {
        super(scope, id, { type: CfnEventSubscription.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'snsTopicArn', this);

        this.snsTopicArn = props.snsTopicArn;
        this.enabled = props.enabled;
        this.eventCategories = props.eventCategories;
        this.sourceIds = props.sourceIds;
        this.sourceType = props.sourceType;
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
            snsTopicArn: this.snsTopicArn,
            enabled: this.enabled,
            eventCategories: this.eventCategories,
            sourceIds: this.sourceIds,
            sourceType: this.sourceType,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnEventSubscriptionPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnGlobalCluster`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html
 */
export interface CfnGlobalClusterProps {

    /**
     * The deletion protection setting for the new global database. The global database can't be deleted when deletion protection is enabled.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html#cfn-rds-globalcluster-deletionprotection
     */
    readonly deletionProtection?: boolean | cdk.IResolvable;

    /**
     * The name of the database engine to be used for this DB cluster.
     *
     * If this property isn't specified, the database engine is derived from the source DB cluster specified by the `SourceDBClusterIdentifier` property.
     *
     * > If the `SourceDBClusterIdentifier` property isn't specified, this property is required. If the `SourceDBClusterIdentifier` property is specified, make sure this property isn't specified.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html#cfn-rds-globalcluster-engine
     */
    readonly engine?: string;

    /**
     * The engine version of the Aurora global database.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html#cfn-rds-globalcluster-engineversion
     */
    readonly engineVersion?: string;

    /**
     * The cluster identifier of the global database cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html#cfn-rds-globalcluster-globalclusteridentifier
     */
    readonly globalClusterIdentifier?: string;

    /**
     * The DB cluster identifier or Amazon Resource Name (ARN) to use as the primary cluster of the global database.
     *
     * > If the `Engine` property isn't specified, this property is required. If the `Engine` property is specified, make sure this property isn't specified.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html#cfn-rds-globalcluster-sourcedbclusteridentifier
     */
    readonly sourceDbClusterIdentifier?: string;

    /**
     * The storage encryption setting for the global database cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html#cfn-rds-globalcluster-storageencrypted
     */
    readonly storageEncrypted?: boolean | cdk.IResolvable;
}

/**
 * Determine whether the given properties match those of a `CfnGlobalClusterProps`
 *
 * @param properties - the TypeScript properties of a `CfnGlobalClusterProps`
 *
 * @returns the result of the validation.
 */
function CfnGlobalClusterPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('deletionProtection', cdk.validateBoolean)(properties.deletionProtection));
    errors.collect(cdk.propertyValidator('engine', cdk.validateString)(properties.engine));
    errors.collect(cdk.propertyValidator('engineVersion', cdk.validateString)(properties.engineVersion));
    errors.collect(cdk.propertyValidator('globalClusterIdentifier', cdk.validateString)(properties.globalClusterIdentifier));
    errors.collect(cdk.propertyValidator('sourceDbClusterIdentifier', cdk.validateString)(properties.sourceDbClusterIdentifier));
    errors.collect(cdk.propertyValidator('storageEncrypted', cdk.validateBoolean)(properties.storageEncrypted));
    return errors.wrap('supplied properties not correct for "CfnGlobalClusterProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::GlobalCluster` resource
 *
 * @param properties - the TypeScript properties of a `CfnGlobalClusterProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::GlobalCluster` resource.
 */
// @ts-ignore TS6133
function cfnGlobalClusterPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnGlobalClusterPropsValidator(properties).assertSuccess();
    return {
        DeletionProtection: cdk.booleanToCloudFormation(properties.deletionProtection),
        Engine: cdk.stringToCloudFormation(properties.engine),
        EngineVersion: cdk.stringToCloudFormation(properties.engineVersion),
        GlobalClusterIdentifier: cdk.stringToCloudFormation(properties.globalClusterIdentifier),
        SourceDBClusterIdentifier: cdk.stringToCloudFormation(properties.sourceDbClusterIdentifier),
        StorageEncrypted: cdk.booleanToCloudFormation(properties.storageEncrypted),
    };
}

// @ts-ignore TS6133
function CfnGlobalClusterPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnGlobalClusterProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnGlobalClusterProps>();
    ret.addPropertyResult('deletionProtection', 'DeletionProtection', properties.DeletionProtection != null ? cfn_parse.FromCloudFormation.getBoolean(properties.DeletionProtection) : undefined);
    ret.addPropertyResult('engine', 'Engine', properties.Engine != null ? cfn_parse.FromCloudFormation.getString(properties.Engine) : undefined);
    ret.addPropertyResult('engineVersion', 'EngineVersion', properties.EngineVersion != null ? cfn_parse.FromCloudFormation.getString(properties.EngineVersion) : undefined);
    ret.addPropertyResult('globalClusterIdentifier', 'GlobalClusterIdentifier', properties.GlobalClusterIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.GlobalClusterIdentifier) : undefined);
    ret.addPropertyResult('sourceDbClusterIdentifier', 'SourceDBClusterIdentifier', properties.SourceDBClusterIdentifier != null ? cfn_parse.FromCloudFormation.getString(properties.SourceDBClusterIdentifier) : undefined);
    ret.addPropertyResult('storageEncrypted', 'StorageEncrypted', properties.StorageEncrypted != null ? cfn_parse.FromCloudFormation.getBoolean(properties.StorageEncrypted) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::RDS::GlobalCluster`
 *
 * The `AWS::RDS::GlobalCluster` resource creates or updates an Amazon Aurora global database spread across multiple AWS Regions.
 *
 * The global database contains a single primary cluster with read-write capability, and a read-only secondary cluster that receives data from the primary cluster through high-speed replication performed by the Aurora storage subsystem.
 *
 * You can create a global database that is initially empty, and then add a primary cluster and a secondary cluster to it.
 *
 * For information about Aurora global databases, see [Working with Amazon Aurora Global Databases](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html) in the *Amazon Aurora User Guide* .
 *
 * @cloudformationResource AWS::RDS::GlobalCluster
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html
 */
export class CfnGlobalCluster extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::RDS::GlobalCluster";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnGlobalCluster {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnGlobalClusterPropsFromCloudFormation(resourceProperties);
        const ret = new CfnGlobalCluster(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * The deletion protection setting for the new global database. The global database can't be deleted when deletion protection is enabled.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html#cfn-rds-globalcluster-deletionprotection
     */
    public deletionProtection: boolean | cdk.IResolvable | undefined;

    /**
     * The name of the database engine to be used for this DB cluster.
     *
     * If this property isn't specified, the database engine is derived from the source DB cluster specified by the `SourceDBClusterIdentifier` property.
     *
     * > If the `SourceDBClusterIdentifier` property isn't specified, this property is required. If the `SourceDBClusterIdentifier` property is specified, make sure this property isn't specified.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html#cfn-rds-globalcluster-engine
     */
    public engine: string | undefined;

    /**
     * The engine version of the Aurora global database.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html#cfn-rds-globalcluster-engineversion
     */
    public engineVersion: string | undefined;

    /**
     * The cluster identifier of the global database cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html#cfn-rds-globalcluster-globalclusteridentifier
     */
    public globalClusterIdentifier: string | undefined;

    /**
     * The DB cluster identifier or Amazon Resource Name (ARN) to use as the primary cluster of the global database.
     *
     * > If the `Engine` property isn't specified, this property is required. If the `Engine` property is specified, make sure this property isn't specified.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html#cfn-rds-globalcluster-sourcedbclusteridentifier
     */
    public sourceDbClusterIdentifier: string | undefined;

    /**
     * The storage encryption setting for the global database cluster.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-globalcluster.html#cfn-rds-globalcluster-storageencrypted
     */
    public storageEncrypted: boolean | cdk.IResolvable | undefined;

    /**
     * Create a new `AWS::RDS::GlobalCluster`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnGlobalClusterProps = {}) {
        super(scope, id, { type: CfnGlobalCluster.CFN_RESOURCE_TYPE_NAME, properties: props });

        this.deletionProtection = props.deletionProtection;
        this.engine = props.engine;
        this.engineVersion = props.engineVersion;
        this.globalClusterIdentifier = props.globalClusterIdentifier;
        this.sourceDbClusterIdentifier = props.sourceDbClusterIdentifier;
        this.storageEncrypted = props.storageEncrypted;
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnGlobalCluster.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            deletionProtection: this.deletionProtection,
            engine: this.engine,
            engineVersion: this.engineVersion,
            globalClusterIdentifier: this.globalClusterIdentifier,
            sourceDbClusterIdentifier: this.sourceDbClusterIdentifier,
            storageEncrypted: this.storageEncrypted,
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnGlobalClusterPropsToCloudFormation(props);
    }
}

/**
 * Properties for defining a `CfnOptionGroup`
 *
 * @struct
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-optiongroup.html
 */
export interface CfnOptionGroupProps {

    /**
     * Specifies the name of the engine that this option group should be associated with.
     *
     * Valid Values:
     *
     * - `mariadb`
     * - `mysql`
     * - `oracle-ee`
     * - `oracle-se2`
     * - `oracle-se1`
     * - `oracle-se`
     * - `postgres`
     * - `sqlserver-ee`
     * - `sqlserver-se`
     * - `sqlserver-ex`
     * - `sqlserver-web`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-optiongroup.html#cfn-rds-optiongroup-enginename
     */
    readonly engineName: string;

    /**
     * Specifies the major version of the engine that this option group should be associated with.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-optiongroup.html#cfn-rds-optiongroup-majorengineversion
     */
    readonly majorEngineVersion: string;

    /**
     * A list of options and the settings for each option.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-optiongroup.html#cfn-rds-optiongroup-optionconfigurations
     */
    readonly optionConfigurations: Array<CfnOptionGroup.OptionConfigurationProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The description of the option group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-optiongroup.html#cfn-rds-optiongroup-optiongroupdescription
     */
    readonly optionGroupDescription: string;

    /**
     * Tags to assign to the option group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-optiongroup.html#cfn-rds-optiongroup-tags
     */
    readonly tags?: cdk.CfnTag[];
}

/**
 * Determine whether the given properties match those of a `CfnOptionGroupProps`
 *
 * @param properties - the TypeScript properties of a `CfnOptionGroupProps`
 *
 * @returns the result of the validation.
 */
function CfnOptionGroupPropsValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('engineName', cdk.requiredValidator)(properties.engineName));
    errors.collect(cdk.propertyValidator('engineName', cdk.validateString)(properties.engineName));
    errors.collect(cdk.propertyValidator('majorEngineVersion', cdk.requiredValidator)(properties.majorEngineVersion));
    errors.collect(cdk.propertyValidator('majorEngineVersion', cdk.validateString)(properties.majorEngineVersion));
    errors.collect(cdk.propertyValidator('optionConfigurations', cdk.requiredValidator)(properties.optionConfigurations));
    errors.collect(cdk.propertyValidator('optionConfigurations', cdk.listValidator(CfnOptionGroup_OptionConfigurationPropertyValidator))(properties.optionConfigurations));
    errors.collect(cdk.propertyValidator('optionGroupDescription', cdk.requiredValidator)(properties.optionGroupDescription));
    errors.collect(cdk.propertyValidator('optionGroupDescription', cdk.validateString)(properties.optionGroupDescription));
    errors.collect(cdk.propertyValidator('tags', cdk.listValidator(cdk.validateCfnTag))(properties.tags));
    return errors.wrap('supplied properties not correct for "CfnOptionGroupProps"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::OptionGroup` resource
 *
 * @param properties - the TypeScript properties of a `CfnOptionGroupProps`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::OptionGroup` resource.
 */
// @ts-ignore TS6133
function cfnOptionGroupPropsToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnOptionGroupPropsValidator(properties).assertSuccess();
    return {
        EngineName: cdk.stringToCloudFormation(properties.engineName),
        MajorEngineVersion: cdk.stringToCloudFormation(properties.majorEngineVersion),
        OptionConfigurations: cdk.listMapper(cfnOptionGroupOptionConfigurationPropertyToCloudFormation)(properties.optionConfigurations),
        OptionGroupDescription: cdk.stringToCloudFormation(properties.optionGroupDescription),
        Tags: cdk.listMapper(cdk.cfnTagToCloudFormation)(properties.tags),
    };
}

// @ts-ignore TS6133
function CfnOptionGroupPropsFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnOptionGroupProps> {
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnOptionGroupProps>();
    ret.addPropertyResult('engineName', 'EngineName', cfn_parse.FromCloudFormation.getString(properties.EngineName));
    ret.addPropertyResult('majorEngineVersion', 'MajorEngineVersion', cfn_parse.FromCloudFormation.getString(properties.MajorEngineVersion));
    ret.addPropertyResult('optionConfigurations', 'OptionConfigurations', cfn_parse.FromCloudFormation.getArray(CfnOptionGroupOptionConfigurationPropertyFromCloudFormation)(properties.OptionConfigurations));
    ret.addPropertyResult('optionGroupDescription', 'OptionGroupDescription', cfn_parse.FromCloudFormation.getString(properties.OptionGroupDescription));
    ret.addPropertyResult('tags', 'Tags', properties.Tags != null ? cfn_parse.FromCloudFormation.getArray(cfn_parse.FromCloudFormation.getCfnTag)(properties.Tags) : undefined as any);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

/**
 * A CloudFormation `AWS::RDS::OptionGroup`
 *
 * The `AWS::RDS::OptionGroup` resource creates or updates an option group, to enable and configure features that are specific to a particular DB engine.
 *
 * @cloudformationResource AWS::RDS::OptionGroup
 * @stability external
 *
 * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-optiongroup.html
 */
export class CfnOptionGroup extends cdk.CfnResource implements cdk.IInspectable {
    /**
     * The CloudFormation resource type name for this resource class.
     */
    public static readonly CFN_RESOURCE_TYPE_NAME = "AWS::RDS::OptionGroup";

    /**
     * A factory method that creates a new instance of this class from an object
     * containing the CloudFormation properties of this resource.
     * Used in the @aws-cdk/cloudformation-include module.
     *
     * @internal
     */
    public static _fromCloudFormation(scope: constructs.Construct, id: string, resourceAttributes: any, options: cfn_parse.FromCloudFormationOptions): CfnOptionGroup {
        resourceAttributes = resourceAttributes || {};
        const resourceProperties = options.parser.parseValue(resourceAttributes.Properties);
        const propsResult = CfnOptionGroupPropsFromCloudFormation(resourceProperties);
        const ret = new CfnOptionGroup(scope, id, propsResult.value);
        for (const [propKey, propVal] of Object.entries(propsResult.extraProperties))  {
            ret.addPropertyOverride(propKey, propVal);
        }
        options.parser.handleAttributes(ret, resourceAttributes, id);
        return ret;
    }

    /**
     * Specifies the name of the engine that this option group should be associated with.
     *
     * Valid Values:
     *
     * - `mariadb`
     * - `mysql`
     * - `oracle-ee`
     * - `oracle-se2`
     * - `oracle-se1`
     * - `oracle-se`
     * - `postgres`
     * - `sqlserver-ee`
     * - `sqlserver-se`
     * - `sqlserver-ex`
     * - `sqlserver-web`
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-optiongroup.html#cfn-rds-optiongroup-enginename
     */
    public engineName: string;

    /**
     * Specifies the major version of the engine that this option group should be associated with.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-optiongroup.html#cfn-rds-optiongroup-majorengineversion
     */
    public majorEngineVersion: string;

    /**
     * A list of options and the settings for each option.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-optiongroup.html#cfn-rds-optiongroup-optionconfigurations
     */
    public optionConfigurations: Array<CfnOptionGroup.OptionConfigurationProperty | cdk.IResolvable> | cdk.IResolvable;

    /**
     * The description of the option group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-optiongroup.html#cfn-rds-optiongroup-optiongroupdescription
     */
    public optionGroupDescription: string;

    /**
     * Tags to assign to the option group.
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-resource-rds-optiongroup.html#cfn-rds-optiongroup-tags
     */
    public readonly tags: cdk.TagManager;

    /**
     * Create a new `AWS::RDS::OptionGroup`.
     *
     * @param scope - scope in which this resource is defined
     * @param id    - scoped id of the resource
     * @param props - resource properties
     */
    constructor(scope: constructs.Construct, id: string, props: CfnOptionGroupProps) {
        super(scope, id, { type: CfnOptionGroup.CFN_RESOURCE_TYPE_NAME, properties: props });
        cdk.requireProperty(props, 'engineName', this);
        cdk.requireProperty(props, 'majorEngineVersion', this);
        cdk.requireProperty(props, 'optionConfigurations', this);
        cdk.requireProperty(props, 'optionGroupDescription', this);

        this.engineName = props.engineName;
        this.majorEngineVersion = props.majorEngineVersion;
        this.optionConfigurations = props.optionConfigurations;
        this.optionGroupDescription = props.optionGroupDescription;
        this.tags = new cdk.TagManager(cdk.TagType.STANDARD, "AWS::RDS::OptionGroup", props.tags, { tagPropertyName: 'tags' });
    }

    /**
     * Examines the CloudFormation resource and discloses attributes.
     *
     * @param inspector - tree inspector to collect and process attributes
     *
     */
    public inspect(inspector: cdk.TreeInspector) {
        inspector.addAttribute("aws:cdk:cloudformation:type", CfnOptionGroup.CFN_RESOURCE_TYPE_NAME);
        inspector.addAttribute("aws:cdk:cloudformation:props", this.cfnProperties);
    }

    protected get cfnProperties(): { [key: string]: any }  {
        return {
            engineName: this.engineName,
            majorEngineVersion: this.majorEngineVersion,
            optionConfigurations: this.optionConfigurations,
            optionGroupDescription: this.optionGroupDescription,
            tags: this.tags.renderTags(),
        };
    }

    protected renderProperties(props: {[key: string]: any}): { [key: string]: any }  {
        return cfnOptionGroupPropsToCloudFormation(props);
    }
}

export namespace CfnOptionGroup {
    /**
     * The `OptionConfiguration` property type specifies an individual option, and its settings, within an `AWS::RDS::OptionGroup` resource.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-optiongroup-optionconfigurations.html
     */
    export interface OptionConfigurationProperty {
        /**
         * A list of DBSecurityGroupMembership name strings used for this option.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-optiongroup-optionconfigurations.html#cfn-rds-optiongroup-optionconfigurations-dbsecuritygroupmemberships
         */
        readonly dbSecurityGroupMemberships?: string[];
        /**
         * The configuration of options to include in a group.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-optiongroup-optionconfigurations.html#cfn-rds-optiongroup-optionconfigurations-optionname
         */
        readonly optionName: string;
        /**
         * The option settings to include in an option group.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-optiongroup-optionconfigurations.html#cfn-rds-optiongroup-optionconfigurations-optionsettings
         */
        readonly optionSettings?: Array<CfnOptionGroup.OptionSettingProperty | cdk.IResolvable> | cdk.IResolvable;
        /**
         * The version for the option.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-optiongroup-optionconfigurations.html#cfn-rds-optiongroup-optionconfiguration-optionversion
         */
        readonly optionVersion?: string;
        /**
         * The optional port for the option.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-optiongroup-optionconfigurations.html#cfn-rds-optiongroup-optionconfigurations-port
         */
        readonly port?: number;
        /**
         * A list of VpcSecurityGroupMembership name strings used for this option.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-optiongroup-optionconfigurations.html#cfn-rds-optiongroup-optionconfigurations-vpcsecuritygroupmemberships
         */
        readonly vpcSecurityGroupMemberships?: string[];
    }
}

/**
 * Determine whether the given properties match those of a `OptionConfigurationProperty`
 *
 * @param properties - the TypeScript properties of a `OptionConfigurationProperty`
 *
 * @returns the result of the validation.
 */
function CfnOptionGroup_OptionConfigurationPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('dbSecurityGroupMemberships', cdk.listValidator(cdk.validateString))(properties.dbSecurityGroupMemberships));
    errors.collect(cdk.propertyValidator('optionName', cdk.requiredValidator)(properties.optionName));
    errors.collect(cdk.propertyValidator('optionName', cdk.validateString)(properties.optionName));
    errors.collect(cdk.propertyValidator('optionSettings', cdk.listValidator(CfnOptionGroup_OptionSettingPropertyValidator))(properties.optionSettings));
    errors.collect(cdk.propertyValidator('optionVersion', cdk.validateString)(properties.optionVersion));
    errors.collect(cdk.propertyValidator('port', cdk.validateNumber)(properties.port));
    errors.collect(cdk.propertyValidator('vpcSecurityGroupMemberships', cdk.listValidator(cdk.validateString))(properties.vpcSecurityGroupMemberships));
    return errors.wrap('supplied properties not correct for "OptionConfigurationProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::OptionGroup.OptionConfiguration` resource
 *
 * @param properties - the TypeScript properties of a `OptionConfigurationProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::OptionGroup.OptionConfiguration` resource.
 */
// @ts-ignore TS6133
function cfnOptionGroupOptionConfigurationPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnOptionGroup_OptionConfigurationPropertyValidator(properties).assertSuccess();
    return {
        DBSecurityGroupMemberships: cdk.listMapper(cdk.stringToCloudFormation)(properties.dbSecurityGroupMemberships),
        OptionName: cdk.stringToCloudFormation(properties.optionName),
        OptionSettings: cdk.listMapper(cfnOptionGroupOptionSettingPropertyToCloudFormation)(properties.optionSettings),
        OptionVersion: cdk.stringToCloudFormation(properties.optionVersion),
        Port: cdk.numberToCloudFormation(properties.port),
        VpcSecurityGroupMemberships: cdk.listMapper(cdk.stringToCloudFormation)(properties.vpcSecurityGroupMemberships),
    };
}

// @ts-ignore TS6133
function CfnOptionGroupOptionConfigurationPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnOptionGroup.OptionConfigurationProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnOptionGroup.OptionConfigurationProperty>();
    ret.addPropertyResult('dbSecurityGroupMemberships', 'DBSecurityGroupMemberships', properties.DBSecurityGroupMemberships != null ? cfn_parse.FromCloudFormation.getStringArray(properties.DBSecurityGroupMemberships) : undefined);
    ret.addPropertyResult('optionName', 'OptionName', cfn_parse.FromCloudFormation.getString(properties.OptionName));
    ret.addPropertyResult('optionSettings', 'OptionSettings', properties.OptionSettings != null ? cfn_parse.FromCloudFormation.getArray(CfnOptionGroupOptionSettingPropertyFromCloudFormation)(properties.OptionSettings) : undefined);
    ret.addPropertyResult('optionVersion', 'OptionVersion', properties.OptionVersion != null ? cfn_parse.FromCloudFormation.getString(properties.OptionVersion) : undefined);
    ret.addPropertyResult('port', 'Port', properties.Port != null ? cfn_parse.FromCloudFormation.getNumber(properties.Port) : undefined);
    ret.addPropertyResult('vpcSecurityGroupMemberships', 'VpcSecurityGroupMemberships', properties.VpcSecurityGroupMemberships != null ? cfn_parse.FromCloudFormation.getStringArray(properties.VpcSecurityGroupMemberships) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}

export namespace CfnOptionGroup {
    /**
     * The `OptionSetting` property type specifies the value for an option within an `OptionSetting` property.
     *
     * @struct
     * @stability external
     *
     * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-optiongroup-optionconfigurations-optionsettings.html
     */
    export interface OptionSettingProperty {
        /**
         * The name of the option that has settings that you can set.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-optiongroup-optionconfigurations-optionsettings.html#cfn-rds-optiongroup-optionconfigurations-optionsettings-name
         */
        readonly name?: string;
        /**
         * The current value of the option setting.
         *
         * @link http://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-properties-rds-optiongroup-optionconfigurations-optionsettings.html#cfn-rds-optiongroup-optionconfigurations-optionsettings-value
         */
        readonly value?: string;
    }
}

/**
 * Determine whether the given properties match those of a `OptionSettingProperty`
 *
 * @param properties - the TypeScript properties of a `OptionSettingProperty`
 *
 * @returns the result of the validation.
 */
function CfnOptionGroup_OptionSettingPropertyValidator(properties: any): cdk.ValidationResult {
    if (!cdk.canInspect(properties)) { return cdk.VALIDATION_SUCCESS; }
    const errors = new cdk.ValidationResults();
    if (typeof properties !== 'object') {
        errors.collect(new cdk.ValidationResult('Expected an object, but received: ' + JSON.stringify(properties)));
    }
    errors.collect(cdk.propertyValidator('name', cdk.validateString)(properties.name));
    errors.collect(cdk.propertyValidator('value', cdk.validateString)(properties.value));
    return errors.wrap('supplied properties not correct for "OptionSettingProperty"');
}

/**
 * Renders the AWS CloudFormation properties of an `AWS::RDS::OptionGroup.OptionSetting` resource
 *
 * @param properties - the TypeScript properties of a `OptionSettingProperty`
 *
 * @returns the AWS CloudFormation properties of an `AWS::RDS::OptionGroup.OptionSetting` resource.
 */
// @ts-ignore TS6133
function cfnOptionGroupOptionSettingPropertyToCloudFormation(properties: any): any {
    if (!cdk.canInspect(properties)) { return properties; }
    CfnOptionGroup_OptionSettingPropertyValidator(properties).assertSuccess();
    return {
        Name: cdk.stringToCloudFormation(properties.name),
        Value: cdk.stringToCloudFormation(properties.value),
    };
}

// @ts-ignore TS6133
function CfnOptionGroupOptionSettingPropertyFromCloudFormation(properties: any): cfn_parse.FromCloudFormationResult<CfnOptionGroup.OptionSettingProperty | cdk.IResolvable> {
    if (cdk.isResolvableObject(properties)) {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    properties = properties == null ? {} : properties;
    if (typeof properties !== 'object') {
        return new cfn_parse.FromCloudFormationResult(properties);
    }
    const ret = new cfn_parse.FromCloudFormationPropertyObject<CfnOptionGroup.OptionSettingProperty>();
    ret.addPropertyResult('name', 'Name', properties.Name != null ? cfn_parse.FromCloudFormation.getString(properties.Name) : undefined);
    ret.addPropertyResult('value', 'Value', properties.Value != null ? cfn_parse.FromCloudFormation.getString(properties.Value) : undefined);
    ret.addUnrecognizedPropertiesAsExtra(properties);
    return ret;
}
