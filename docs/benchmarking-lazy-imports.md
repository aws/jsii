# Benchmarking Lazy Imports Against aws-cdk-lib

## Prerequisites

- This jsii repo checked out on the lazy-imports branch
- Node.js and yarn installed
- Python 3.10+ installed
- A CDK Python project with a venv (for running the benchmark)

## Step 1: Measure the baseline (eager imports)

**Run from:** your CDK Python project directory (e.g., `~/cdk-python-project`)

```bash
source .venv/bin/activate

python3 -c "
import time, sys
before = len(sys.modules)
t0 = time.perf_counter()
import aws_cdk
t1 = time.perf_counter()
after = len(sys.modules)
print(f'Import time: {(t1-t0)*1000:.0f} ms')
print(f'Modules loaded: {after - before}')
"
```

Record the numbers. This is the "before" (eager loading).

## Step 2: Build aws-cdk-lib from source

**Run from:** anywhere (we'll clone into `~/aws-cdk`)

```bash
# Clone the CDK repo (~2GB, takes a few minutes)
git clone https://github.com/aws/aws-cdk.git ~/aws-cdk

# Install dependencies (takes several minutes)
cd ~/aws-cdk
yarn install

# Build aws-cdk-lib (compiles TypeScript, produces .jsii assembly)
# lerna handles building dependencies automatically
# Takes 10-30 minutes on first run
npx lerna run build --scope=aws-cdk-lib
```

## Step 3: Generate Python code with lazy imports

**Run from:** the jsii repo root (this repo, on the lazy-imports branch)

```bash
cd ~/jsii

# Use YOUR branch's pacmak (with lazy imports) to regenerate
# the Python code from the CDK assembly
node packages/jsii-pacmak/bin/jsii-pacmak \
  --code-only --no-fingerprint \
  --target python \
  --output /tmp/lazy-cdk \
  ~/aws-cdk/packages/aws-cdk-lib
```

This produces the lazy-loading version of `aws-cdk-lib` at
`/tmp/lazy-cdk/python/`.

## Step 4: Install the lazy version into your CDK project

**Run from:** your CDK Python project directory

```bash
cd ~/cdk-python-project
source .venv/bin/activate

# Uninstall the current (eager) version
pip uninstall aws-cdk-lib -y

# Install the locally-generated lazy version
pip install /tmp/lazy-cdk/python
```

## Step 5: Measure the improvement (lazy imports)

**Run from:** your CDK Python project directory

```bash
python3 -c "
import time, sys
before = len(sys.modules)
t0 = time.perf_counter()
import aws_cdk
t1 = time.perf_counter()
after = len(sys.modules)
print(f'Import time: {(t1-t0)*1000:.0f} ms')
print(f'Modules loaded: {after - before}')
"
```

## Step 6: Run the full phase breakdown

**Run from:** your CDK Python project directory

Save this as `bench.py`:

```python
import time

# Phase 1: Imports
t0 = time.perf_counter()
import aws_cdk as cdk
from aws_cdk import aws_s3
from constructs import Construct
t1 = time.perf_counter()

# Phase 2: App construction
app = cdk.App()
stack = cdk.Stack(app, "BenchStack")
aws_s3.Bucket(stack, "MyBucket")
t2 = time.perf_counter()

# Phase 3: Synthesis
app.synth()
t3 = time.perf_counter()

# Results
total = t3 - t0
print(f"\n--- Timing Breakdown ---")
print(f"Imports:          {(t1-t0)*1000:7.0f} ms  ({(t1-t0)/total*100:.1f}%)")
print(f"App construction: {(t2-t1)*1000:7.0f} ms  ({(t2-t1)/total*100:.1f}%)")
print(f"Synthesis:        {(t3-t2)*1000:7.0f} ms  ({(t3-t2)/total*100:.1f}%)")
print(f"Total:            {total*1000:7.0f} ms  (100%)")
```

Then run:

```bash
python3 bench.py
```

## Step 7: Restore the original version (cleanup)

**Run from:** your CDK Python project directory

```bash
pip uninstall aws-cdk-lib -y
pip install aws-cdk-lib==2.211.0
```

## Expected results

| Metric | Eager (before) | Lazy (after) |
|--------|---------------|--------------|
| `import aws_cdk` time | ~3200 ms | <100 ms |
| Modules loaded | ~896 | ~5-10 |
| First submodule access (`aws_s3`) | 0 ms (already loaded) | ~30-100 ms |
| Total bench.py time | ~3465 ms | ~300-400 ms |

## Troubleshooting

**Step 3 fails with "Cannot find module":**
Make sure you built the jsii repo first (`yarn build` in the jsii repo root).

**Step 4 fails with dependency errors:**
The lazy version may need `constructs` and other deps. Install them:
```bash
pip install constructs "jsii>=1.x,<2.0"
```

**Import still slow after Step 4:**
Verify the lazy version is installed:
```bash
python3 -c "import aws_cdk; print(hasattr(aws_cdk, '_SUBMODULES'))"
```
Should print `True` for the lazy version.
