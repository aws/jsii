#!/usr/bin/env python3
"""Instrument kernel send() to time each round-trip; report latency growth
across the synth (early ops vs late ops). Reveals whether per-op kernel
latency rises as the object graph grows.

Usage: optrace.py <app_dir> <stacks> <resources>
"""
import os
import re
import sys
import time

app_dir = os.path.abspath(sys.argv[1]); stacks = int(sys.argv[2]); rps = int(sys.argv[3])
sys.path.insert(0, app_dir); os.chdir(app_dir)
src = open(os.path.join(app_dir, "app.py")).read()
mods = [f"aws_cdk.aws_{m}" for m in re.findall(r"\baws_(\w+)\s+as\s+", src) if m != "cdk"]
import importlib
import aws_cdk as cdk
for m in mods: importlib.import_module(m)
from aws_cdk import aws_ssm as ssm
tag = "lazy" if "_LAZY_CLASSES" in open(os.path.join(os.path.dirname(cdk.__file__), "aws_ssm", "__init__.py")).read(30000) else "eager"

# Monkeypatch _NodeProcess.send to record per-op latency
lat = []  # elapsed_ms per round-trip
import jsii._kernel.providers.process as pp
_orig = pp._NodeProcess.send
def timed_send(self, request, response_type):
    t0 = time.perf_counter()
    r = _orig(self, request, response_type)
    lat.append((time.perf_counter() - t0) * 1000.0)
    return r
pp._NodeProcess.send = timed_send

t0 = time.perf_counter()
app = cdk.App(analytics_reporting=False, performance_reporting=False)
for i in range(stacks):
    st = cdk.Stack(app, f"S-{i:03d}", analytics_reporting=False)
    for n in range(rps):
        ssm.StringParameter(st, f"P{n:04d}", parameter_name=f"/b/s-{i:03d}/p-{n:04d}", string_value=f"v-{i:03d}-{n:04d}")
app.synth()
wall = time.perf_counter() - t0

# bucket latencies into deciles by op index
N = len(lat)
print(f"build={tag} total_ops={N} wall={wall:.3f}s total_send_ms={sum(lat):.0f}")
buckets = 10
for b in range(buckets):
    lo = N * b // buckets; hi = N * (b + 1) // buckets
    seg = lat[lo:hi]
    if seg:
        print(f"  ops[{lo:>7}-{hi:>7}] avg={sum(seg)/len(seg):.4f}ms")
