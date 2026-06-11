import os
import pytest

from jsii._stack_trace import capture_stack_trace, is_enabled


class TestIsEnabled:
    def test_disabled_when_not_set(self, monkeypatch):
        monkeypatch.delenv("JSII_HOST_STACK_TRACES", raising=False)
        assert is_enabled() is False

    def test_enabled_with_1(self, monkeypatch):
        monkeypatch.setenv("JSII_HOST_STACK_TRACES", "1")
        assert is_enabled() is True

    def test_enabled_with_true(self, monkeypatch):
        monkeypatch.setenv("JSII_HOST_STACK_TRACES", "true")
        assert is_enabled() is True

    def test_enabled_with_yes(self, monkeypatch):
        monkeypatch.setenv("JSII_HOST_STACK_TRACES", "yes")
        assert is_enabled() is True

    def test_disabled_with_other_value(self, monkeypatch):
        monkeypatch.setenv("JSII_HOST_STACK_TRACES", "0")
        assert is_enabled() is False


class TestCaptureStackTrace:
    def test_returns_frames(self):
        result = capture_stack_trace()
        assert result is not None
        assert len(result) > 0

    def test_frame_format(self):
        result = capture_stack_trace()
        assert result is not None
        for frame in result:
            assert len(frame) == 4
            file, line, col, fn = frame
            assert isinstance(file, str)
            assert isinstance(line, int)
            assert isinstance(col, int)
            assert isinstance(fn, str)
            assert col == 0

    def test_most_recent_frame_first(self):
        def outer():
            def inner():
                return capture_stack_trace()

            return inner()

        result = outer()
        assert result is not None
        function_names = [frame[3] for frame in result]
        inner_idx = function_names.index("inner")
        outer_idx = function_names.index("outer")
        assert inner_idx < outer_idx

    def test_filters_jsii_internal_frames(self):
        result = capture_stack_trace()
        assert result is not None
        jsii_dir = os.path.dirname(os.path.abspath(os.path.dirname(__file__)))
        for frame in result:
            assert not frame[0].startswith(os.path.join(jsii_dir, "jsii") + os.sep)

    def test_filters_synthetic_frames(self):
        result = capture_stack_trace()
        assert result is not None
        for frame in result:
            assert not frame[0].startswith("<")

    def test_this_file_appears_in_frames(self):
        result = capture_stack_trace()
        assert result is not None
        files = [frame[0] for frame in result]
        assert any(__file__ in f for f in files)
