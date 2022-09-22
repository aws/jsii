import platform
import subprocess


class TestInvokeBinScript:
    def test_invoke_script(self) -> None:
        script_path = get_script_path("calc")
        result = subprocess.run(script_path, capture_output=True)

        assert result.returncode == 0
        assert result.stdout == b"Hello World!\n\n"
        assert result.stderr == b""

    def test_invoke_script_with_args(self) -> None:
        script_path = get_script_path("calc")
        result = subprocess.run([script_path, "arg1", "arg2"], capture_output=True)

        assert result.returncode == 0
        assert result.stdout == b"Hello World!\n  arguments: arg1, arg2\n\n"
        assert result.stderr == b""


def get_script_path(script_name: str) -> str:
    if platform.system == "Windows":
        return f".env\\Scripts\\{script_name}.cmd"
    else:
        return f".env/bin/{script_name}"
