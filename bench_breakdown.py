"""
Detailed breakdown of where time goes when importing 310 aws-cdk submodules.

Run with:
  ~/Desktop/cdk-python-project/.venv/bin/python3 ~/jsii/bench_breakdown.py

Phases:
  1. jsii runtime — the jsii Python package (metaclasses, kernel client, etc.)
  2. aws_cdk root + kernel — broken down into:
     2A. Python parsing/compiling root __init__.py + dependency _jsii modules
     2B. JSIIAssembly.load() calls (tgz extract + Node.js spawn + IPC)
  3. 310 submodules — Python parsing/compiling each submodule's __init__.py
"""
import time
import sys
import importlib
import os

SUBMODULES = [
    "aws_cdk.aws_accessanalyzer",
    "aws_cdk.aws_acmpca",
    "aws_cdk.aws_aiops",
    "aws_cdk.aws_amazonmq",
    "aws_cdk.aws_amplify",
    "aws_cdk.aws_amplifyuibuilder",
    "aws_cdk.aws_apigateway",
    "aws_cdk.aws_apigatewayv2",
    "aws_cdk.aws_apigatewayv2_authorizers",
    "aws_cdk.aws_apigatewayv2_integrations",
    "aws_cdk.aws_appconfig",
    "aws_cdk.aws_appflow",
    "aws_cdk.aws_appintegrations",
    "aws_cdk.aws_applicationautoscaling",
    "aws_cdk.aws_applicationinsights",
    "aws_cdk.aws_applicationsignals",
    "aws_cdk.aws_appmesh",
    "aws_cdk.aws_apprunner",
    "aws_cdk.aws_appstream",
    "aws_cdk.aws_appsync",
    "aws_cdk.aws_apptest",
    "aws_cdk.aws_aps",
    "aws_cdk.aws_arcregionswitch",
    "aws_cdk.aws_arczonalshift",
    "aws_cdk.aws_athena",
    "aws_cdk.aws_auditmanager",
    "aws_cdk.aws_autoscaling",
    "aws_cdk.aws_autoscaling_common",
    "aws_cdk.aws_autoscaling_hooktargets",
    "aws_cdk.aws_autoscalingplans",
    "aws_cdk.aws_b2bi",
    "aws_cdk.aws_backup",
    "aws_cdk.aws_backupgateway",
    "aws_cdk.aws_batch",
    "aws_cdk.aws_bcmdataexports",
    "aws_cdk.aws_bcmpricingcalculator",
    "aws_cdk.aws_bedrock",
    "aws_cdk.aws_bedrockagentcore",
    "aws_cdk.aws_bedrockmantle",
    "aws_cdk.aws_billingconductor",
    "aws_cdk.aws_braket",
    "aws_cdk.aws_budgets",
    "aws_cdk.aws_cases",
    "aws_cdk.aws_cassandra",
    "aws_cdk.aws_ce",
    "aws_cdk.aws_certificatemanager",
    "aws_cdk.aws_chatbot",
    "aws_cdk.aws_chime",
    "aws_cdk.aws_cleanrooms",
    "aws_cdk.aws_cleanroomsml",
    "aws_cdk.aws_cloud9",
    "aws_cdk.aws_cloudformation",
    "aws_cdk.aws_cloudfront",
    "aws_cdk.aws_cloudfront_origins",
    "aws_cdk.aws_cloudtrail",
    "aws_cdk.aws_cloudwatch",
    "aws_cdk.aws_cloudwatch_actions",
    "aws_cdk.aws_codeartifact",
    "aws_cdk.aws_codebuild",
    "aws_cdk.aws_codecommit",
    "aws_cdk.aws_codeconnections",
    "aws_cdk.aws_codedeploy",
    "aws_cdk.aws_codeguruprofiler",
    "aws_cdk.aws_codegurureviewer",
    "aws_cdk.aws_codepipeline",
    "aws_cdk.aws_codepipeline_actions",
    "aws_cdk.aws_codestar",
    "aws_cdk.aws_codestarconnections",
    "aws_cdk.aws_codestarnotifications",
    "aws_cdk.aws_cognito",
    "aws_cdk.aws_cognito_identitypool",
    "aws_cdk.aws_comprehend",
    "aws_cdk.aws_computeoptimizer",
    "aws_cdk.aws_config",
    "aws_cdk.aws_connect",
    "aws_cdk.aws_connectcampaigns",
    "aws_cdk.aws_connectcampaignsv2",
    "aws_cdk.aws_controltower",
    "aws_cdk.aws_cur",
    "aws_cdk.aws_customerprofiles",
    "aws_cdk.aws_databrew",
    "aws_cdk.aws_datapipeline",
    "aws_cdk.aws_datasync",
    "aws_cdk.aws_datazone",
    "aws_cdk.aws_dax",
    "aws_cdk.aws_deadline",
    "aws_cdk.aws_detective",
    "aws_cdk.aws_devicefarm",
    "aws_cdk.aws_devopsagent",
    "aws_cdk.aws_devopsguru",
    "aws_cdk.aws_directconnect",
    "aws_cdk.aws_directoryservice",
    "aws_cdk.aws_dlm",
    "aws_cdk.aws_dms",
    "aws_cdk.aws_docdb",
    "aws_cdk.aws_docdbelastic",
    "aws_cdk.aws_dsql",
    "aws_cdk.aws_dynamodb",
    "aws_cdk.aws_ec2",
    "aws_cdk.aws_ecr",
    "aws_cdk.aws_ecr_assets",
    "aws_cdk.aws_ecs",
    "aws_cdk.aws_ecs_patterns",
    "aws_cdk.aws_efs",
    "aws_cdk.aws_eks",
    "aws_cdk.aws_eks_v2",
    "aws_cdk.aws_elasticache",
    "aws_cdk.aws_elasticbeanstalk",
    "aws_cdk.aws_elasticloadbalancing",
    "aws_cdk.aws_elasticloadbalancingv2",
    "aws_cdk.aws_elasticloadbalancingv2_actions",
    "aws_cdk.aws_elasticloadbalancingv2_targets",
    "aws_cdk.aws_elasticsearch",
    "aws_cdk.aws_elementalinference",
    "aws_cdk.aws_emr",
    "aws_cdk.aws_emrcontainers",
    "aws_cdk.aws_emrserverless",
    "aws_cdk.aws_entityresolution",
    "aws_cdk.aws_events",
    "aws_cdk.aws_events_targets",
    "aws_cdk.aws_eventschemas",
    "aws_cdk.aws_evidently",
    "aws_cdk.aws_evs",
    "aws_cdk.aws_finspace",
    "aws_cdk.aws_fis",
    "aws_cdk.aws_fms",
    "aws_cdk.aws_forecast",
    "aws_cdk.aws_frauddetector",
    "aws_cdk.aws_fsx",
    "aws_cdk.aws_gamelift",
    "aws_cdk.aws_gameliftstreams",
    "aws_cdk.aws_globalaccelerator",
    "aws_cdk.aws_globalaccelerator_endpoints",
    "aws_cdk.aws_glue",
    "aws_cdk.aws_grafana",
    "aws_cdk.aws_greengrass",
    "aws_cdk.aws_greengrassv2",
    "aws_cdk.aws_groundstation",
    "aws_cdk.aws_guardduty",
    "aws_cdk.aws_healthimaging",
    "aws_cdk.aws_healthlake",
    "aws_cdk.aws_iam",
    "aws_cdk.aws_identitystore",
    "aws_cdk.aws_imagebuilder",
    "aws_cdk.aws_inspector",
    "aws_cdk.aws_inspectorv2",
    "aws_cdk.aws_interconnect",
    "aws_cdk.aws_internetmonitor",
    "aws_cdk.aws_invoicing",
    "aws_cdk.aws_iot",
    "aws_cdk.aws_iotanalytics",
    "aws_cdk.aws_iotcoredeviceadvisor",
    "aws_cdk.aws_iotevents",
    "aws_cdk.aws_iotfleethub",
    "aws_cdk.aws_iotfleetwise",
    "aws_cdk.aws_iotsitewise",
    "aws_cdk.aws_iotthingsgraph",
    "aws_cdk.aws_iottwinmaker",
    "aws_cdk.aws_iotwireless",
    "aws_cdk.aws_ivs",
    "aws_cdk.aws_ivschat",
    "aws_cdk.aws_kafkaconnect",
    "aws_cdk.aws_kendra",
    "aws_cdk.aws_kendraranking",
    "aws_cdk.aws_kinesis",
    "aws_cdk.aws_kinesisanalytics",
    "aws_cdk.aws_kinesisanalyticsv2",
    "aws_cdk.aws_kinesisfirehose",
    "aws_cdk.aws_kinesisvideo",
    "aws_cdk.aws_kms",
    "aws_cdk.aws_lakeformation",
    "aws_cdk.aws_lambda",
    "aws_cdk.aws_lambda_destinations",
    "aws_cdk.aws_lambda_event_sources",
    "aws_cdk.aws_lambda_nodejs",
    "aws_cdk.aws_launchwizard",
    "aws_cdk.aws_lex",
    "aws_cdk.aws_licensemanager",
    "aws_cdk.aws_lightsail",
    "aws_cdk.aws_location",
    "aws_cdk.aws_logs",
    "aws_cdk.aws_logs_destinations",
    "aws_cdk.aws_lookoutequipment",
    "aws_cdk.aws_lookoutmetrics",
    "aws_cdk.aws_lookoutvision",
    "aws_cdk.aws_m2",
    "aws_cdk.aws_macie",
    "aws_cdk.aws_managedblockchain",
    "aws_cdk.aws_mediaconnect",
    "aws_cdk.aws_mediaconvert",
    "aws_cdk.aws_medialive",
    "aws_cdk.aws_mediapackage",
    "aws_cdk.aws_mediapackagev2",
    "aws_cdk.aws_mediastore",
    "aws_cdk.aws_mediatailor",
    "aws_cdk.aws_memorydb",
    "aws_cdk.aws_mpa",
    "aws_cdk.aws_msk",
    "aws_cdk.aws_mwaa",
    "aws_cdk.aws_mwaaserverless",
    "aws_cdk.aws_neptune",
    "aws_cdk.aws_neptunegraph",
    "aws_cdk.aws_networkfirewall",
    "aws_cdk.aws_networkmanager",
    "aws_cdk.aws_nimblestudio",
    "aws_cdk.aws_notifications",
    "aws_cdk.aws_notificationscontacts",
    "aws_cdk.aws_novaact",
    "aws_cdk.aws_oam",
    "aws_cdk.aws_observabilityadmin",
    "aws_cdk.aws_odb",
    "aws_cdk.aws_omics",
    "aws_cdk.aws_opensearchserverless",
    "aws_cdk.aws_opensearchservice",
    "aws_cdk.aws_opsworks",
    "aws_cdk.aws_opsworkscm",
    "aws_cdk.aws_organizations",
    "aws_cdk.aws_osis",
    "aws_cdk.aws_panorama",
    "aws_cdk.aws_paymentcryptography",
    "aws_cdk.aws_pcaconnectorad",
    "aws_cdk.aws_pcaconnectorscep",
    "aws_cdk.aws_pcs",
    "aws_cdk.aws_personalize",
    "aws_cdk.aws_pinpoint",
    "aws_cdk.aws_pinpointemail",
    "aws_cdk.aws_pipes",
    "aws_cdk.aws_proton",
    "aws_cdk.aws_qbusiness",
    "aws_cdk.aws_qldb",
    "aws_cdk.aws_quicksight",
    "aws_cdk.aws_ram",
    "aws_cdk.aws_rbin",
    "aws_cdk.aws_rds",
    "aws_cdk.aws_redshift",
    "aws_cdk.aws_redshiftserverless",
    "aws_cdk.aws_refactorspaces",
    "aws_cdk.aws_rekognition",
    "aws_cdk.aws_resiliencehub",
    "aws_cdk.aws_resourceexplorer2",
    "aws_cdk.aws_resourcegroups",
    "aws_cdk.aws_robomaker",
    "aws_cdk.aws_rolesanywhere",
    "aws_cdk.aws_route53",
    "aws_cdk.aws_route53_patterns",
    "aws_cdk.aws_route53_targets",
    "aws_cdk.aws_route53globalresolver",
    "aws_cdk.aws_route53profiles",
    "aws_cdk.aws_route53recoverycontrol",
    "aws_cdk.aws_route53recoveryreadiness",
    "aws_cdk.aws_route53resolver",
    "aws_cdk.aws_rtbfabric",
    "aws_cdk.aws_rum",
    "aws_cdk.aws_s3",
    "aws_cdk.aws_s3_assets",
    "aws_cdk.aws_s3_deployment",
    "aws_cdk.aws_s3_notifications",
    "aws_cdk.aws_s3express",
    "aws_cdk.aws_s3files",
    "aws_cdk.aws_s3objectlambda",
    "aws_cdk.aws_s3outposts",
    "aws_cdk.aws_s3tables",
    "aws_cdk.aws_s3vectors",
    "aws_cdk.aws_sagemaker",
    "aws_cdk.aws_sam",
    "aws_cdk.aws_scheduler",
    "aws_cdk.aws_scheduler_targets",
    "aws_cdk.aws_sdb",
    "aws_cdk.aws_secretsmanager",
    "aws_cdk.aws_securityagent",
    "aws_cdk.aws_securityhub",
    "aws_cdk.aws_securitylake",
    "aws_cdk.aws_servicecatalog",
    "aws_cdk.aws_servicecatalogappregistry",
    "aws_cdk.aws_servicediscovery",
    "aws_cdk.aws_ses",
    "aws_cdk.aws_ses_actions",
    "aws_cdk.aws_shield",
    "aws_cdk.aws_signer",
    "aws_cdk.aws_simspaceweaver",
    "aws_cdk.aws_smsvoice",
    "aws_cdk.aws_sns",
    "aws_cdk.aws_sns_subscriptions",
    "aws_cdk.aws_sqs",
    "aws_cdk.aws_ssm",
    "aws_cdk.aws_ssmcontacts",
    "aws_cdk.aws_ssmguiconnect",
    "aws_cdk.aws_ssmincidents",
    "aws_cdk.aws_ssmquicksetup",
    "aws_cdk.aws_sso",
    "aws_cdk.aws_stepfunctions",
    "aws_cdk.aws_stepfunctions_tasks",
    "aws_cdk.aws_supportapp",
    "aws_cdk.aws_synthetics",
    "aws_cdk.aws_systemsmanagersap",
    "aws_cdk.aws_timestream",
    "aws_cdk.aws_transfer",
    "aws_cdk.aws_uxc",
    "aws_cdk.aws_verifiedpermissions",
    "aws_cdk.aws_voiceid",
    "aws_cdk.aws_vpclattice",
    "aws_cdk.aws_waf",
    "aws_cdk.aws_wafregional",
    "aws_cdk.aws_wafv2",
    "aws_cdk.aws_wisdom",
    "aws_cdk.aws_workspaces",
    "aws_cdk.aws_workspacesinstances",
    "aws_cdk.aws_workspacesthinclient",
    "aws_cdk.aws_workspacesweb",
    "aws_cdk.aws_xray",
]

print("=" * 65)
print("IMPORT TIME BREAKDOWN - 310 aws-cdk submodules")
print("=" * 65)

# Phase 1: jsii runtime
t0 = time.perf_counter()
import jsii
t1 = time.perf_counter()

# Patch JSIIAssembly.load to measure each call
_original_load = jsii.JSIIAssembly.load.__func__
_load_times = []

@classmethod
def _timed_load(cls, *args, **kwargs):
    t_start = time.perf_counter()
    result = _original_load(cls, *args, **kwargs)
    t_end = time.perf_counter()
    _load_times.append((args[0], (t_end - t_start) * 1000))
    return result

jsii.JSIIAssembly.load = _timed_load

# Phase 2: aws_cdk root + _jsii (assembly load + kernel spawn)
t2 = time.perf_counter()
import aws_cdk._jsii
t3 = time.perf_counter()

phase2_total = (t3 - t2) * 1000
phase2_assembly = sum(ms for _, ms in _load_times)
phase2_parsing = phase2_total - phase2_assembly

# Phase 3: 310 submodules
times = []
t4 = time.perf_counter()
for mod_name in SUBMODULES:
    t_start = time.perf_counter()
    importlib.import_module(mod_name)
    t_end = time.perf_counter()
    times.append((mod_name, (t_end - t_start) * 1000))
t5 = time.perf_counter()

# Summary
root_path = sys.modules['aws_cdk'].__file__
root_size = os.path.getsize(root_path)
root_lines = open(root_path).read().count('\n')

print()
print(f"Phase 1 - jsii runtime                    {(t1-t0)*1000:>7.0f}ms")
print(f"Phase 2 - aws_cdk root + kernel start     {phase2_total:>7.0f}ms")
print(f"  2A. Python parsing/compile:             {phase2_parsing:>7.0f}ms")
print(f"       (aws_cdk/__init__.py: {root_lines} lines, {root_size//1024}KB)")
print(f"  2B. JSIIAssembly.load() calls:          {phase2_assembly:>7.0f}ms")
print(f"       (tgz extract + Node.js spawn + IPC handshake)")
for name, ms in _load_times:
    print(f"         {name:<40} {ms:>6.1f}ms")
print(f"Phase 3 - 310 submodules                  {(t5-t4)*1000:>7.0f}ms")
print(f"---")
print(f"TOTAL                                     {(t5-t0)*1000:>7.0f}ms")
print()

# Phase 3 details
times.sort(key=lambda x: x[1], reverse=True)
total_sub = sum(t for _, t in times)

print(f"Phase 3 breakdown:")
print(f"  Average per module:  {total_sub/len(times):.1f}ms")
print(f"  Median:              {times[len(times)//2][1]:.1f}ms")
print(f"  Top 10 slowest:")
for mod, ms in times[:10]:
    m = sys.modules[mod]
    if hasattr(m, '__file__') and m.__file__:
        sz = os.path.getsize(m.__file__) // 1024
        print(f"    {mod.replace('aws_cdk.', ''):<40} {ms:>6.1f}ms  ({sz}KB)")
    else:
        print(f"    {mod.replace('aws_cdk.', ''):<40} {ms:>6.1f}ms")

print()
print(f"  Distribution:")
print(f"    Under 1ms:   {sum(1 for _, t in times if t < 1):>3}/{len(times)} modules")
print(f"    1-5ms:       {sum(1 for _, t in times if 1 <= t < 5):>3}/{len(times)} modules")
print(f"    5-20ms:      {sum(1 for _, t in times if 5 <= t < 20):>3}/{len(times)} modules")
print(f"    20ms+:       {sum(1 for _, t in times if t >= 20):>3}/{len(times)} modules")
