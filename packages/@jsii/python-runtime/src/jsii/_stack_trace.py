import os
import traceback
from typing import List, Optional

_INTERNAL_PREFIXES = (os.path.dirname(os.path.abspath(__file__)) + os.sep,)


def capture_stack_trace() -> Optional[List[List]]:
    """Capture the current Python stack trace, filtered to user frames only.

    Returns a list of [file, line, column, function] tuples suitable for
    sending over the jsii wire protocol, or None if stack trace capture
    is disabled via the JSII_HOST_STACK_TRACES environment variable.

    Frames are ordered most-recent-first (matching V8 Error.stack convention).
    """
    if os.environ.get("JSII_HOST_STACK_TRACES", "").lower() not in ("1", "true", "yes"):
        return None

    frames = traceback.extract_stack()
    result = []

    for frame in frames:
        if any(frame.filename.startswith(prefix) for prefix in _INTERNAL_PREFIXES):
            continue
        if frame.filename.startswith("<"):
            continue
        result.append([frame.filename, frame.lineno, 0, frame.name])

    result.reverse()
    return result if result else None
