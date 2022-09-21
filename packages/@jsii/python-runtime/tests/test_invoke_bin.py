import subprocess


class TestInvokeBinScript:
    def test_invoke_script(self) -> None:
        result = subprocess.run(".env/bin/calc", capture_output=True)

        assert result.returncode == 0
        assert result.stdout == b"Hello World!\n\n"
        assert result.stderr == b""

    def test_invoke_script_with_args(self) -> None:
        result = subprocess.run([".env/bin/calc", "arg1", "arg2"], capture_output=True)

        assert result.returncode == 0
        assert result.stdout == b"Hello World!\n  arguments: arg1, arg2\n\n"
        assert result.stderr == b""
