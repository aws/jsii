#!/usr/bin/env python3
"""Synth wall + CPU vs blocked at increasing workloads. Detects superlinearity.
Usage: superlin.py <app_dir> <label>
"""
import os
import re
import sys
import time

app_dir = os.path.abspath(sys.argv[1]); label = sys.argv[2]
sys.path.insert(0, app_dir); os.chdir(app_dir)
src = open(os.path.join(app_dir, "app.py")).read()
mods = [f"aws_cdk.aws_{m}" for m in re.findall(r"\baws_(\w+)\s+as\s+", src) if m != "cdk"]
import importlib
import aws_cdk as cdk
for m in mods: importlib.import_module(m)
from aws_cdk import aws_ssm as ssm
tag = "lazy" if "_LAZY_CLASSES" in open(os.path.join(os.path.dirname(cdk.__file__), "aws_ssm", "__init__.py")).read(30000) else "eager"

print(f"build={tag} label={label} NODE_OPTIONS={os.environ.get('NODE_OPTIONS','')}")
print(f"{'stacks':>7}{'res':>9}{'wall_s':>9}{'cpu_s':>8}{'blocked_s':>11}{'us/res':>9}")
for stacks in [10, 50, 100, 200, 400]:
    rps = 400
    def snap():
        t = os.times(); return time.perf_counter(), t.user + t.system
    w0, c0 = snap()
    app = cdk.App(analytics_reporting=False, performance_reporting=False)
    for i in range(stacks):
        st = cdk.Stack(app, f"S-{i:03d}", analytics_reporting=False)
        for n in range(rps):
            ssm.StringParameter(st, f"P{n:04d}", parameter_name=f"/b/s-{i:03d}/p-{n:04d}", string_value=f"v-{i:03d}-{n:04d}")
    app.synth()
    w1, c1 = snap()
    wall = w1 - w0; cpu = c1 - c0; blocked = wall - cpu
    n = stacks * rps
    print(f"{stacks:>7}{n:>9}{wall:>9.3f}{cpu:>8.3f}{blocked:>11.3f}{wall/n*1e6:>9.1f}", flush=True)
