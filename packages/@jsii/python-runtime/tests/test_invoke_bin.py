import platform
import subprocess
from datetime import datetime
import pytest


class TestInvokeBinScript:
    @pytest.mark.skipif(
        platform.system() == "Windows",
        reason="jsii-pacmak does not generate windows scripts",
    )
    def test_invoke_script(self) -> None:
        script_path = f".env/bin/calc"
        result = subprocess.run([script_path], capture_output=True)

        assert result.returncode == 0
        assert result.stdout == b"Hello World!\n"
        assert result.stderr == b""

    @pytest.mark.skipif(
        platform.system() == "Windows",
        reason="jsii-pacmak does not generate windows scripts",
    )
    def test_invoke_script_with_args(self) -> None:
        script_path = f".env/bin/calc"
        result = subprocess.run([script_path, "arg1", "arg2"], capture_output=True)

        assert result.returncode == 0
        assert result.stdout == b"Hello World!\n  arguments: arg1, arg2\n"
        assert result.stderr == b""

    @pytest.mark.skipif(
        platform.system() == "Windows",
        reason="jsii-pacmak does not generate windows scripts",
    )
    def test_invoke_script_with_failure(self) -> None:
        script_path = f".env/bin/calc"
        result = subprocess.run([script_path, "arg1", "fail"], capture_output=True)

        assert result.returncode == 3
        assert result.stdout == b"Hello World!\n  arguments: arg1, fail\n"
        assert result.stderr == b"error message to stderr\n"

    @pytest.mark.skipif(
        platform.system() == "Windows",
        reason="jsii-pacmak does not generate windows scripts",
    )
    def test_invoke_script_with_line_flush(self) -> None:
        """Make sure lines are flushed immediately as they are generated, rather than
        buffered to the end
        """
        script_path = f".env/bin/calc"
        proc = subprocess.Popen(
            [script_path, "arg1", "delay"], stdout=subprocess.PIPE, bufsize=1
        )

        timed_lines = []
        last_dt = None
        if proc.stdout is not None:
            for line in iter(proc.stdout.readline, b""):
                last_dt = datetime.utcnow() if last_dt is None else last_dt
                current_dt = datetime.utcnow()

                delay_s = round((current_dt - last_dt).total_seconds())
                timed_lines.append([line, delay_s])

                last_dt = current_dt
        exit_code = proc.wait()

        assert exit_code == 0
        assert timed_lines == [
            [b"Hello World!\n", 0],
            [b"  arguments: arg1, delay\n", 0],
            [b"sleeping 1s 1\n", 0],
            [b"sleeping 1s 2\n", 1],
            [b"sleeping 1s 3\n", 1],
            [b"sleeping 1s 4\n", 1],
            [b"sleeping 1s 5\n", 1],
        ]
