import platform
import subprocess


class TestInvokeBinScript:
    def test_invoke_script(self) -> None:
        result = run_script("calc")

        assert result.returncode == 0
        assert result.stdout == b"Hello World!\n\n"
        assert result.stderr == b""

    def test_invoke_script_with_args(self) -> None:
        result = run_script("calc", "arg1", "arg2")

        assert result.returncode == 0
        assert result.stdout == b"Hello World!\n  arguments: arg1, arg2\n\n"
        assert result.stderr == b""


def run_script(script_name: str, *args: str) -> subprocess.CompletedProcess:
    if platform.system() == "Windows":
        script_path = f".env\\Scripts\\{script_name}.cmd"
        return subprocess.run([script_path, *args], capture_output=True, shell=True)
    else:
        script_path = f".env/bin/{script_name}"
        return subprocess.run([script_path, *args], capture_output=True)
