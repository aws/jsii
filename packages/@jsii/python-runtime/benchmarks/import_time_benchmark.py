#!/usr/bin/env python3
"""
Benchmark: Import Time Measurement for jsii-generated Python Packages
======================================================================

This script measures the cold-start import time of a Python package by spawning
fresh Python subprocesses for each iteration. It is designed to quantify the
performance improvement from removing `publication.publish()` from jsii-generated
packages.

Methodology:
  - Each iteration spawns a new Python subprocess to avoid warm module caches.
  - The subprocess uses `time.perf_counter_ns()` for high-resolution timing.
  - A minimum of 30 iterations are run to produce statistically meaningful results.
  - Results include mean, median, standard deviation, min, and max.
  - The script can compare a baseline (with publication) vs treatment (without).

Usage:
  python import_time_benchmark.py <package_name>
  python import_time_benchmark.py jsii_calc --iterations 50
  python import_time_benchmark.py jsii --baseline-file baseline.json
  python import_time_benchmark.py jsii --compare treatment.json baseline.json

Environment:
  - Python 3.10+ recommended (minimum supported by jsii)
  - Run on a quiet system for consistent results
  - Close other CPU-intensive applications during benchmarking

Author: jsii maintainers
License: Apache-2.0
"""

import argparse
import json
import os
import platform
import statistics
import subprocess
import sys
import textwrap
import time
from pathlib import Path


# Minimum iterations for statistical significance
MIN_ITERATIONS = 30

# Python snippet executed in each subprocess to measure import time
IMPORT_TIMER_SCRIPT = textwrap.dedent("""\
    import time
    start = time.perf_counter_ns()
    import {package}
    end = time.perf_counter_ns()
    print(end - start)
""")


def get_system_info() -> dict:
    """Collect system information for reproducibility."""
    return {
        "python_version": platform.python_version(),
        "python_implementation": platform.python_implementation(),
        "os": platform.system(),
        "os_version": platform.version(),
        "architecture": platform.machine(),
        "processor": platform.processor(),
        "hostname": platform.node(),
    }


def measure_import_time(package_name: str, python_executable: str = sys.executable) -> int:
    """
    Measure the import time of a package in a fresh subprocess.

    Returns the import time in nanoseconds.
    Raises RuntimeError if the subprocess fails.
    """
    script = IMPORT_TIMER_SCRIPT.format(package=package_name)
    result = subprocess.run(
        [python_executable, "-c", script],
        capture_output=True,
        text=True,
        timeout=60,
    )
    if result.returncode != 0:
        raise RuntimeError(
            f"Failed to import '{package_name}': {result.stderr.strip()}"
        )
    return int(result.stdout.strip())


def run_benchmark(
    package_name: str,
    iterations: int = MIN_ITERATIONS,
    python_executable: str = sys.executable,
    warmup: int = 3,
) -> dict:
    """
    Run the import time benchmark for the specified number of iterations.

    Args:
        package_name: The Python package to import.
        iterations: Number of measurement iterations (minimum 30).
        python_executable: Path to the Python interpreter to use.
        warmup: Number of warmup iterations (discarded).

    Returns:
        Dictionary with timing results and metadata.
    """
    iterations = max(iterations, MIN_ITERATIONS)

    # Warmup runs (discarded) to stabilize OS caches
    for _ in range(warmup):
        try:
            measure_import_time(package_name, python_executable)
        except RuntimeError:
            pass  # Warmup failures are acceptable

    # Measurement runs
    times_ns = []
    errors = 0
    for i in range(iterations):
        try:
            t = measure_import_time(package_name, python_executable)
            times_ns.append(t)
        except RuntimeError as e:
            errors += 1
            if errors > iterations * 0.1:  # Fail if >10% errors
                raise RuntimeError(
                    f"Too many errors ({errors}/{i+1}). Last error: {e}"
                )

    if len(times_ns) < MIN_ITERATIONS:
        raise RuntimeError(
            f"Only {len(times_ns)} successful measurements "
            f"(need at least {MIN_ITERATIONS})"
        )

    # Convert to milliseconds for readability
    times_ms = [t / 1_000_000 for t in times_ns]

    return {
        "package": package_name,
        "python_executable": python_executable,
        "iterations": len(times_ns),
        "errors": errors,
        "warmup": warmup,
        "times_ns": times_ns,
        "stats": {
            "mean_ms": statistics.mean(times_ms),
            "median_ms": statistics.median(times_ms),
            "stddev_ms": statistics.stdev(times_ms) if len(times_ms) > 1 else 0,
            "min_ms": min(times_ms),
            "max_ms": max(times_ms),
        },
        "system_info": get_system_info(),
        "timestamp": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
    }


def format_results_table(results: dict) -> str:
    """Format benchmark results as a readable table."""
    stats = results["stats"]
    lines = [
        "",
        f"  Package:    {results['package']}",
        f"  Python:     {results['system_info']['python_version']} "
        f"({results['system_info']['python_implementation']})",
        f"  OS:         {results['system_info']['os']} "
        f"({results['system_info']['architecture']})",
        f"  Iterations: {results['iterations']} "
        f"(warmup: {results['warmup']}, errors: {results['errors']})",
        "",
        "  ┌─────────────┬──────────────┐",
        "  │ Metric      │ Value        │",
        "  ├─────────────┼──────────────┤",
        f"  │ Mean        │ {stats['mean_ms']:>8.2f} ms │",
        f"  │ Median      │ {stats['median_ms']:>8.2f} ms │",
        f"  │ Std Dev     │ {stats['stddev_ms']:>8.2f} ms │",
        f"  │ Min         │ {stats['min_ms']:>8.2f} ms │",
        f"  │ Max         │ {stats['max_ms']:>8.2f} ms │",
        "  └─────────────┴──────────────┘",
        "",
    ]
    return "\n".join(lines)


def format_comparison_table(baseline: dict, treatment: dict) -> str:
    """Format a comparison between baseline and treatment results."""
    b_stats = baseline["stats"]
    t_stats = treatment["stats"]

    mean_improvement = (
        (b_stats["mean_ms"] - t_stats["mean_ms"]) / b_stats["mean_ms"] * 100
    )
    median_improvement = (
        (b_stats["median_ms"] - t_stats["median_ms"]) / b_stats["median_ms"] * 100
    )

    lines = [
        "",
        "  Comparison: Baseline (with publication) vs Treatment (without publication)",
        "",
        "  ┌─────────────┬──────────────────┬──────────────────┬──────────────┐",
        "  │ Metric      │ Baseline         │ Treatment        │ Improvement  │",
        "  ├─────────────┼──────────────────┼──────────────────┼──────────────┤",
        f"  │ Mean        │ {b_stats['mean_ms']:>12.2f} ms │ "
        f"{t_stats['mean_ms']:>12.2f} ms │ {mean_improvement:>+8.1f} %  │",
        f"  │ Median      │ {b_stats['median_ms']:>12.2f} ms │ "
        f"{t_stats['median_ms']:>12.2f} ms │ {median_improvement:>+8.1f} %  │",
        f"  │ Std Dev     │ {b_stats['stddev_ms']:>12.2f} ms │ "
        f"{t_stats['stddev_ms']:>12.2f} ms │      -       │",
        f"  │ Min         │ {b_stats['min_ms']:>12.2f} ms │ "
        f"{t_stats['min_ms']:>12.2f} ms │      -       │",
        f"  │ Max         │ {b_stats['max_ms']:>12.2f} ms │ "
        f"{t_stats['max_ms']:>12.2f} ms │      -       │",
        "  └─────────────┴──────────────────┴──────────────────┴──────────────┘",
        "",
        f"  Mean improvement:   {mean_improvement:+.1f}%",
        f"  Median improvement: {median_improvement:+.1f}%",
        "",
    ]

    # Gate check
    if mean_improvement > 5:
        lines.append("  ✅ PASS: Mean improvement exceeds 5% threshold.")
    else:
        lines.append("  ❌ FAIL: Mean improvement does NOT exceed 5% threshold.")

    lines.append("")
    return "\n".join(lines)


def save_results(results: dict, filepath: str) -> None:
    """Save benchmark results to a JSON file."""
    # Remove raw times for smaller file (keep stats)
    output = {k: v for k, v in results.items() if k != "times_ns"}
    output["times_ns_sample"] = results["times_ns"][:5]  # Keep a sample
    output["times_ns_count"] = len(results["times_ns"])

    Path(filepath).parent.mkdir(parents=True, exist_ok=True)
    with open(filepath, "w") as f:
        json.dump(output, f, indent=2)
    print(f"  Results saved to: {filepath}")


def load_results(filepath: str) -> dict:
    """Load benchmark results from a JSON file."""
    with open(filepath) as f:
        return json.load(f)


def detect_default_package() -> str:
    """Try to detect a suitable default package for benchmarking."""
    # Try jsii_calc first (representative large package)
    try:
        subprocess.run(
            [sys.executable, "-c", "import jsii_calc"],
            capture_output=True,
            timeout=30,
        )
        return "jsii_calc"
    except (subprocess.TimeoutExpired, FileNotFoundError):
        pass

    # Fall back to jsii itself
    try:
        subprocess.run(
            [sys.executable, "-c", "import jsii"],
            capture_output=True,
            timeout=30,
        )
        return "jsii"
    except (subprocess.TimeoutExpired, FileNotFoundError):
        pass

    return "jsii"


def main():
    parser = argparse.ArgumentParser(
        description="Measure cold-start import time of a Python package.",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=textwrap.dedent("""\
            Examples:
              # Measure current import time
              python import_time_benchmark.py jsii_calc

              # Run with more iterations and save results
              python import_time_benchmark.py jsii --iterations 50 --save baseline.json

              # Compare two saved result files
              python import_time_benchmark.py jsii --compare treatment.json baseline.json

              # Measure and compare against a saved baseline
              python import_time_benchmark.py jsii --baseline-file baseline.json
        """),
    )
    parser.add_argument(
        "package",
        nargs="?",
        default=None,
        help="Package name to import (default: jsii_calc if available, else jsii)",
    )
    parser.add_argument(
        "--iterations", "-n",
        type=int,
        default=MIN_ITERATIONS,
        help=f"Number of iterations (minimum {MIN_ITERATIONS}, default: {MIN_ITERATIONS})",
    )
    parser.add_argument(
        "--warmup", "-w",
        type=int,
        default=3,
        help="Number of warmup iterations to discard (default: 3)",
    )
    parser.add_argument(
        "--save", "-s",
        type=str,
        default=None,
        help="Save results to a JSON file",
    )
    parser.add_argument(
        "--baseline-file",
        type=str,
        default=None,
        help="Path to a baseline results JSON file to compare against",
    )
    parser.add_argument(
        "--compare",
        nargs=2,
        metavar=("TREATMENT", "BASELINE"),
        help="Compare two saved result files (treatment vs baseline)",
    )
    parser.add_argument(
        "--python",
        type=str,
        default=sys.executable,
        help="Python executable to use for measurements (default: current interpreter)",
    )

    args = parser.parse_args()

    # Handle --compare mode (no measurement needed)
    if args.compare:
        treatment_file, baseline_file = args.compare
        print("\n  Loading saved results for comparison...")
        treatment = load_results(treatment_file)
        baseline = load_results(baseline_file)
        print(format_comparison_table(baseline, treatment))
        return

    # Determine package name
    package_name = args.package or detect_default_package()

    print(f"\n  Import Time Benchmark")
    print(f"  {'=' * 50}")
    print(f"  Package:    {package_name}")
    print(f"  Python:     {sys.version.split()[0]}")
    print(f"  OS:         {platform.system()} {platform.machine()}")
    print(f"  Iterations: {args.iterations} (warmup: {args.warmup})")
    print(f"  {'=' * 50}")
    print(f"\n  Running benchmark...")

    try:
        results = run_benchmark(
            package_name=package_name,
            iterations=args.iterations,
            python_executable=args.python,
            warmup=args.warmup,
        )
    except RuntimeError as e:
        print(f"\n  ERROR: {e}", file=sys.stderr)
        sys.exit(1)

    print(format_results_table(results))

    # Save results if requested
    if args.save:
        save_results(results, args.save)

    # Compare against baseline if provided
    if args.baseline_file:
        print("  Comparing against baseline...")
        baseline = load_results(args.baseline_file)
        print(format_comparison_table(baseline, results))


if __name__ == "__main__":
    main()
