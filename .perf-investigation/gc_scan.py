#!/usr/bin/env python3
"""Superlin scan with optional gc.disable() and GC stat reporting.
Usage: gc_scan.py <app_dir> <label> <gc:on|off>
"""
import gc
import os
import re
import sys
import time

app_dir = os.path.abspath(sys.argv[1]); label = sys.argv[2]; gcmode = sys.argv[3]
sys.path.insert(0, app_dir); os.chdir(app_dir)
src = open(os.path.join(app_dir, "app.py")).read()
mods = [f"aws_cdk.aws_{m}" for m in re.findall(r"\baws_(\w+)\s+as\s+", src) if m != "cdk"]
import importlib
import aws_cdk as cdk
for m in mods: importlib.import_module(m)
from aws_cdk import aws_ssm as ssm
tag = "lazy" if "_LAZY_CLASSES" in open(os.path.join(os.path.dirname(cdk.__file__), "aws_ssm", "__init__.py")).read(30000) else "eager"

if gcmode == "off":
    gc.disable()

print(f"build={tag} label={label} gc={gcmode}")
print(f"{'stacks':>7}{'res':>9}{'wall_s':>9}{'us/res':>9}{'gc_collections':>16}")
for stacks in [10, 50, 100, 200, 400]:
    rps = 400
    gc.collect()
    before = sum(s['collections'] for s in gc.get_stats())
    t0 = time.perf_counter()
    app = cdk.App(analytics_reporting=False, performance_reporting=False)
    for i in range(stacks):
        st = cdk.Stack(app, f"S-{i:03d}", analytics_reporting=False)
        for n in range(rps):
            ssm.StringParameter(st, f"P{n:04d}", parameter_name=f"/b/s-{i:03d}/p-{n:04d}", string_value=f"v-{i:03d}-{n:04d}")
    app.synth()
    wall = time.perf_counter() - t0
    after = sum(s['collections'] for s in gc.get_stats())
    n = stacks * rps
    print(f"{stacks:>7}{n:>9}{wall:>9.3f}{wall/n*1e6:>9.1f}{after-before:>16}", flush=True)
