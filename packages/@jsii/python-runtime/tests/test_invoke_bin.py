import platform
import subprocess
import sys
import pytest


class TestInvokeBinScript:
    @pytest.mark.skipif(platform.system() == "Windows", reason="jsii-pacmak does not generate windows scripts")
    def test_invoke_script(self) -> None:
        result = run_script("calc")

        assert result.returncode == 0
        assert result.stdout == b"Hello World!\n\n"
        assert result.stderr == b""

    @pytest.mark.skipif(platform.system() == "Windows", reason="jsii-pacmak does not generate windows scripts")
    def test_invoke_script_with_args(self) -> None:
        result = run_script("calc", "arg1", "arg2")

        assert result.returncode == 0
        assert result.stdout == b"Hello World!\n  arguments: arg1, arg2\n\n"
        assert result.stderr == b""


def run_script(script_name: str, *args: str) -> subprocess.CompletedProcess:
    if platform.system() == "Windows":
        # currently not used, the calling semantics have not been defined for bin scripts on windows
        script_path = f".env\\Scripts\\{script_name}"
        return subprocess.run([sys.executable, script_path, *args], capture_output=True)
    else:
        script_path = f".env/bin/{script_name}"
        return subprocess.run([script_path, *args], capture_output=True)
