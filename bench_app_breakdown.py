"""
Breakdown of a real CDK app (DynamoDB + Lambda + API Gateway).
Measures import phase vs execution phase separately.

Run with:
  cd ~/Desktop/cdk-python-project && .venv/bin/python3 ~/jsii/bench_app_breakdown.py
"""
import time
import sys

# ===== PHASE 1: jsii runtime =====
t0 = time.perf_counter()
import jsii
t1 = time.perf_counter()

# Patch JSIIAssembly.load to measure
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

# ===== PHASE 2: aws_cdk root + kernel =====
t2 = time.perf_counter()
import aws_cdk._jsii
t3 = time.perf_counter()

phase2_total = (t3 - t2) * 1000
phase2_assembly = sum(ms for _, ms in _load_times)
phase2_parsing = phase2_total - phase2_assembly

# ===== PHASE 3: app imports (the 4 submodules) =====
t4 = time.perf_counter()
import aws_cdk as cdk
from aws_cdk import (
    CfnOutput,
    RemovalPolicy,
    Stack,
    aws_apigateway as apigw,
    aws_dynamodb as dynamodb,
    aws_lambda as _lambda,
)
from constructs import Construct
t5 = time.perf_counter()

# ===== PHASE 4: app execution (construct tree + synth) =====
t6 = time.perf_counter()

class CdkPythonProjectStack(Stack):
    def __init__(self, scope: Construct, construct_id: str, **kwargs) -> None:
        super().__init__(scope, construct_id, **kwargs)

        self.numbers_table = dynamodb.Table(
            self,
            "NumbersTable",
            table_name="NumbersTable",
            partition_key=dynamodb.Attribute(
                name="id", type=dynamodb.AttributeType.STRING
            ),
            removal_policy=RemovalPolicy.DESTROY,
        )

        self.numbers_table.add_global_secondary_index(
            index_name="TimestampIndex",
            partition_key=dynamodb.Attribute(
                name="gsi_pk", type=dynamodb.AttributeType.STRING
            ),
            sort_key=dynamodb.Attribute(
                name="timestamp", type=dynamodb.AttributeType.STRING
            ),
        )

        self.number_handler = _lambda.Function(
            self,
            "NumberHandler",
            runtime=_lambda.Runtime.PYTHON_3_12,
            handler="handler.handler",
            code=_lambda.Code.from_asset("lambda"),
            environment={
                "TABLE_NAME": self.numbers_table.table_name,
            },
        )

        self.numbers_table.grant_read_write_data(self.number_handler)

        self.api = apigw.RestApi(
            self,
            "NumbersApi",
            rest_api_name="Numbers Service",
        )

        lambda_integration = apigw.LambdaIntegration(self.number_handler)

        self.api.root.add_method("GET", lambda_integration)

        numbers_resource = self.api.root.add_resource("numbers")
        numbers_resource.add_method("POST", lambda_integration)
        numbers_resource.add_method("GET", lambda_integration)

        CfnOutput(
            self,
            "ApiEndpointUrl",
            value=self.api.url,
            description="API Gateway endpoint URL",
        )

t7 = time.perf_counter()

app = cdk.App()
CdkPythonProjectStack(app, "CdkPythonProjectStack")

t8 = time.perf_counter()

app.synth()

t9 = time.perf_counter()

# ===== RESULTS =====
print("=" * 65)
print("CDK APP BREAKDOWN (DynamoDB + Lambda + API Gateway)")
print("=" * 65)
print()
print(f"Phase 1 - jsii runtime                    {(t1-t0)*1000:>7.0f}ms")
print(f"Phase 2 - aws_cdk root + kernel           {phase2_total:>7.0f}ms")
print(f"  2A. Python parsing/compile:             {phase2_parsing:>7.0f}ms")
print(f"  2B. JSIIAssembly.load() calls:          {phase2_assembly:>7.0f}ms")
for name, ms in _load_times:
    print(f"         {name:<40} {ms:>6.1f}ms")
print(f"Phase 3 - app imports (4 submodules)      {(t5-t4)*1000:>7.0f}ms")
print(f"Phase 4 - class definition                {(t7-t6)*1000:>7.0f}ms")
print(f"Phase 5 - construct tree (App + Stack)    {(t8-t7)*1000:>7.0f}ms")
print(f"Phase 6 - app.synth()                     {(t9-t8)*1000:>7.0f}ms")
print(f"---")
print(f"TOTAL                                     {(t9-t0)*1000:>7.0f}ms")
print(f"")
print(f"Import phases (1+2+3):                    {(t5-t0)*1000:>7.0f}ms")
print(f"Execution phases (4+5+6):                 {(t9-t6)*1000:>7.0f}ms")
