# Python Lazy Imports: Full Flow

The full flow from a CDK developer writing TypeScript to a Python user running `import aws_cdk`.

---

## 1. CDK team writes TypeScript

A CDK developer writes something like:

```typescript
// packages/aws-cdk-lib/aws-s3/lib/bucket.ts
export class Bucket extends Resource {
  constructor(scope: Construct, id: string, props?: BucketProps) {
    super(scope, id);
    // ... implementation that creates CloudFormation resources
  }

  public addLifecycleRule(rule: LifecycleRule): void { ... }
  public get bucketArn(): string { ... }
}
```

This is the real implementation. It lives in the `aws-cdk` repo (separate from this one).

---

## 2. TypeScript compiler (`tsc`) compiles it

```bash
$ npx nx run aws-cdk-lib:build
```

This does two things:
- Compiles `.ts` → `.js` (normal TypeScript compilation)
- Runs the **jsii compiler** which validates the code follows jsii rules (no overloads, no complex generics, etc.) and produces the `.jsii` assembly file

---

## 3. jsii compiler produces the `.jsii` assembly

The `.jsii` file is a JSON catalog of the entire public API. For the `Bucket` class above, it records:

- Class name: `Bucket`
- Namespace: `aws_s3`
- FQN: `aws-cdk-lib.aws_s3.Bucket`
- Base class: `aws-cdk-lib.Resource`
- Constructor parameters and their types
- Every public method and property
- Documentation strings

This is the contract between the TypeScript world and all target languages.

---

## 4. jsii-pacmak reads the assembly and generates Python

```bash
$ npx jsii-pacmak --targets python --code-only
```

pacmak (this repo, `packages/jsii-pacmak/lib/targets/python.ts`) reads the `.jsii` JSON and generates Python source files. For `Bucket`, it generates something like:

```python
# aws_cdk/aws_s3/__init__.py

@jsii.implements(IBucket)
class Bucket(Resource, metaclass=jsii.JSIIMeta, jsii_type="aws-cdk-lib.aws_s3.Bucket"):
    def __init__(self, scope: Construct, id: str, *, versioned: bool = None, ...) -> None:
        jsii.create(self.__class__, self, [scope, id, props])

    @builtins.property
    @jsii.member(jsii_name="bucketArn")
    def bucket_arn(self) -> str:
        return typing.cast(str, jsii.get(self, "bucketArn"))

    @jsii.member(jsii_name="addLifecycleRule")
    def add_lifecycle_rule(self, *, ...) -> None:
        jsii.invoke(self, "addLifecycleRule", [rule])
```

Notice: every method body just calls `jsii.create`, `jsii.get`, or `jsii.invoke`. These are thin wrappers that forward to Node.js.

And for the root module, it generates:

```python
# aws_cdk/__init__.py

# ... root-level types ...

publication.publish()

# Loading modules to ensure their types are registered with the jsii runtime library
from . import aws_s3
from . import aws_lambda
from . import aws_ec2
# ... 300+ more ← THE PROBLEM
```

---

## 5. The package is published to PyPI

The CDK release pipeline takes the generated Python code, packages it into a wheel (`.whl`), and uploads it to PyPI as `aws-cdk-lib`.

---

## 6. User installs it

```bash
$ pip install aws-cdk-lib
```

This downloads the wheel from PyPI and extracts it into `.venv/lib/python3.x/site-packages/aws_cdk/`. The files there are exactly what pacmak generated.

---

## 7. User writes their app

```python
# app.py
from aws_cdk import App, Stack, aws_s3

class MyStack(Stack):
    def __init__(self, scope, id):
        super().__init__(scope, id)
        aws_s3.Bucket(self, "MyBucket", versioned=True)

app = App()
MyStack(app, "MyStack")
app.synth()
```

---

## 8. User runs `cdk synth`

```bash
$ cdk synth
```

This starts a Node.js process (the CDK CLI), which spawns a Python subprocess to run `app.py`. Here's what happens inside Python:

1. Python executes `from aws_cdk import App, Stack, aws_s3`
2. Python opens `aws_cdk/__init__.py` and starts executing it top-to-bottom
3. It defines root-level classes (`App`, `Stack`, etc.)
4. It hits `from . import aws_s3` → loads `aws_s3/__init__.py` → defines `Bucket`, `BucketProps`, etc.
5. It hits `from . import aws_lambda` → loads `aws_lambda/__init__.py` → defines hundreds of Lambda classes
6. It hits `from . import aws_ec2` → loads `aws_ec2/__init__.py` → defines hundreds of EC2 classes
7. **...repeats 300+ times...** ← 6 seconds of your life
8. Finally, Python returns to `app.py` and starts running user code
9. `aws_s3.Bucket(self, "MyBucket")` calls `jsii.create(...)` which sends a message to Node.js
10. Node.js creates the real Bucket object and returns a reference
11. `app.synth()` tells Node.js to synthesize → produces CloudFormation JSON

---

## 9. What we're changing

Step 4 (pacmak code generation) is where we intervene. We change the generator so that step 8 above becomes:

1. Python executes `from aws_cdk import App, Stack, aws_s3`
2. Python opens `aws_cdk/__init__.py` and starts executing it
3. It defines root-level classes (`App`, `Stack`, etc.)
4. It defines `_SUBMODULES = {"aws_s3", "aws_lambda", ...}` and `__getattr__` — **no actual imports happen**
5. Python sees the user wants `aws_s3` → calls `__getattr__("aws_s3")` → imports just that one module
6. Done. **~0.2 seconds instead of 6.**

Steps 5-7 (loading 300 modules) are eliminated. Only the modules the user actually references get loaded.

---

## The two repos

| Repo | What it contains | Your role |
|---|---|---|
| `aws-cdk` (GitHub) | The CDK library in TypeScript + the `.jsii` assembly | You don't modify this |
| `jsii` (this workspace) | jsii-pacmak, the code generator | **You modify this** |

You change the generator here, and the next CDK release automatically picks up the new pacmak, regenerates the Python package with lazy imports, publishes to PyPI, and users get faster imports without changing their code.
