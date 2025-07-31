import os
import threading
from typing import Dict, Callable, Optional, Any
from types import MappingProxyType


class EnvironmentChangeEvent:
    """Represents an environment variable change event"""

    def __init__(
        self,
        type: str,
        key: str,
        value: Optional[str] = None,
        old_value: Optional[str] = None,
    ):
        self.type = type  # 'set' or 'delete'
        self.key = key
        self.value = value
        self.old_value = old_value

    def __repr__(self):
        return f"EnvironmentChangeEvent(type='{self.type}', key='{self.key}', value='{self.value}', old_value='{self.old_value}')"


class PythonEnvironmentMonitor:
    """Monitors Python os.environ for changes and provides automatic sync"""

    def __init__(self, change_handler: Callable[[EnvironmentChangeEvent], None]):
        self.change_handler = change_handler
        self.original_environ = os.environ
        self._monitoring_enabled = True
        self._lock = threading.Lock()
        self.wrap_os_environ()

    def wrap_os_environ(self):
        """Replace os.environ with a monitoring wrapper"""
        monitor = self

        class MonitoredEnviron:
            def __init__(self, original_environ):
                self._original = original_environ

            def __getitem__(self, key):
                return self._original[key]

            def __setitem__(self, key, value):
                with monitor._lock:
                    if monitor._monitoring_enabled:
                        old_value = self._original.get(key)
                        self._original[key] = value

                        # Immediately notify of change
                        monitor.change_handler(
                            EnvironmentChangeEvent(
                                type="set", key=key, value=value, old_value=old_value
                            )
                        )
                    else:
                        self._original[key] = value

            def __delitem__(self, key):
                with monitor._lock:
                    if monitor._monitoring_enabled:
                        old_value = self._original.get(key)
                        del self._original[key]

                        # Immediately notify of deletion
                        monitor.change_handler(
                            EnvironmentChangeEvent(
                                type="delete", key=key, old_value=old_value
                            )
                        )
                    else:
                        del self._original[key]

            def __contains__(self, key):
                return key in self._original

            def __iter__(self):
                return iter(self._original)

            def __len__(self):
                return len(self._original)

            def get(self, key, default=None):
                return self._original.get(key, default)

            def keys(self):
                return self._original.keys()

            def values(self):
                return self._original.values()

            def items(self):
                return self._original.items()

            def update(self, other):
                if monitor._monitoring_enabled:
                    for key, value in other.items():
                        self[key] = value  # Use monitored setitem
                else:
                    self._original.update(other)

            def pop(self, key, *default):
                with monitor._lock:
                    if monitor._monitoring_enabled:
                        old_value = self._original.get(key)
                        result = self._original.pop(key, *default)
                        if old_value is not None:  # Only notify if key existed
                            monitor.change_handler(
                                EnvironmentChangeEvent(
                                    type="delete", key=key, old_value=old_value
                                )
                            )
                        return result
                    else:
                        return self._original.pop(key, *default)

            def popitem(self):
                with monitor._lock:
                    if monitor._monitoring_enabled:
                        key, value = self._original.popitem()
                        monitor.change_handler(
                            EnvironmentChangeEvent(
                                type="delete", key=key, old_value=value
                            )
                        )
                        return key, value
                    else:
                        return self._original.popitem()

            def clear(self):
                with monitor._lock:
                    if monitor._monitoring_enabled:
                        # Notify for each deleted key
                        for key, value in list(self._original.items()):
                            monitor.change_handler(
                                EnvironmentChangeEvent(
                                    type="delete", key=key, old_value=value
                                )
                            )
                    self._original.clear()

            def setdefault(self, key, default=None):
                with monitor._lock:
                    if key not in self._original:
                        if monitor._monitoring_enabled:
                            self._original[key] = default
                            monitor.change_handler(
                                EnvironmentChangeEvent(
                                    type="set", key=key, value=default, old_value=None
                                )
                            )
                        else:
                            self._original[key] = default
                        return default
                    return self._original[key]

            def __repr__(self):
                return repr(self._original)

            def __str__(self):
                return str(self._original)

        # Replace os.environ with our monitored version
        os.environ = MonitoredEnviron(self.original_environ)

    def apply_change(self, event: EnvironmentChangeEvent):
        """Apply change from external source (Node.js) without triggering monitoring"""
        with self._lock:
            # Temporarily disable monitoring
            self._monitoring_enabled = False
            try:
                if event.type == "set" and event.value is not None:
                    os.environ[event.key] = event.value
                elif event.type == "delete":
                    if event.key in os.environ:
                        del os.environ[event.key]
            finally:
                # Re-enable monitoring
                self._monitoring_enabled = True

    def disable_monitoring(self):
        """Disable monitoring temporarily"""
        with self._lock:
            self._monitoring_enabled = False

    def enable_monitoring(self):
        """Re-enable monitoring"""
        with self._lock:
            self._monitoring_enabled = True
