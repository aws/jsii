import subprocess

class TestInvokeBinScript:
    def test_invoke_script(self) -> None:
      result = subprocess.run(".env/bin/calc", capture_output=True)
      # FIXME
      assert result is None

    # def test_invoke_script_with_args(self) -> None:
    #   result = subprocess.run([".env/bin/calc", "arg1", "arg2"], capture_output=True)
    #   # FIXME
    #   assert result is None